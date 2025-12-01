export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  homepage: string | null; // Website URL
  html_url: string; // GitHub repo URL
  topics: string[]; // Tags/topics
  stargazers_count: number;
  updated_at: string; // Last updated date
  created_at: string; // Created date
}

interface GraphQLError {
  message: string;
}

interface GraphQLResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<{
          id: string;
          name: string;
          description: string | null;
          homepageUrl: string | null;
          url: string;
          updatedAt: string;
          createdAt: string;
          repositoryTopics: {
            nodes: Array<{
              topic: {
                name: string;
              };
            }>;
          };
          stargazerCount: number;
        }>;
      };
    };
  };
  errors?: GraphQLError[];
}

export async function getPinnedRepos(username: string): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  const query = `
    query($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              homepageUrl
              url
              updatedAt
              createdAt
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              stargazerCount
            }
          }
        }
      }
    }
  `;

  const variables = { username };

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch pinned repos: ${res.statusText}`);
  }

  const data = (await res.json()) as GraphQLResponse;

  if (data.errors) {
    throw new Error(
      `GraphQL errors: ${data.errors.map((e) => e.message).join(", ")}`
    );
  }

  const repos = data.data?.user?.pinnedItems?.nodes || [];

  return repos.map((repo) => ({
    id: parseInt(repo.id.replace(/\D/g, "")) || 0,
    name: repo.name,
    description: repo.description,
    homepage: repo.homepageUrl,
    html_url: repo.url,
    topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
    stargazers_count: repo.stargazerCount,
    updated_at: repo.updatedAt,
    created_at: repo.createdAt,
  }));
}

// Keep the old function for backward compatibility
export async function getPublicRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=created&per_page=10`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch repos: ${res.statusText}`);
  }

  return res.json();
}
