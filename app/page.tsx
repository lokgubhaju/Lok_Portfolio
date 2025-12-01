import IntroSection from "@/components/Intro/IntroSection";
import Experience from "@/components/Experience/Experience";
import Education from "@/components/Education/Education";
import WorkHighlights from "@/components/WorkHighlights/WorkHighlights";
import { getPinnedRepos } from "@/lib/github";
import { SidebarTool } from "@/components/SidebarTool/SidebarTool";

export default async function Home() {
  const githubUsername = 'lokgubhaju';

  let workHighlights;
  const images = [
    "/images/screenshots/Darukaa_screenshot.png",
    "/images/screenshots/Onlinekhabar_screenshot.png",
    "/images/screenshots/Arshia_screenshot.png",
    "/images/screenshots/Brows_screenshot.png",
    "/images/screenshots/Bootstrap_screenshot.png",
  ];

  if (githubUsername) {
    try {
      const repos = await getPinnedRepos(githubUsername);

      workHighlights = repos
        .filter((repo) => repo.homepage) // Only repos with websites
        .map((repo, index) => {
          const createdYear = repo.created_at
            ? new Date(repo.created_at).getFullYear().toString()
            : undefined;

          return {
            id: `repo-${repo.id}`,
            title: repo.name,
            subtitle: repo.description || "",
            description: repo.description || "",
            image: images[index % images.length],
            tags: repo.topics,
            website: repo.homepage!,
            projectLink: repo.html_url,
            year: createdYear,
          };
        });
    } catch (error) {
      console.error("Failed to fetch GitHub repos:", error);
      // Fall back to default highlights if fetch fails
      workHighlights = undefined;
    }
  }

  return (
    <div>
      <main className="main-content">
        <div className="max-w-5xl mx-auto">
          <SidebarTool />
          <div id="home">
            <IntroSection
              name="Lok Gubhaju"
              title="Frontend Engineer"
              avatarSrc="/images/Lok_avatar.png"
              yearsExperience="4+"
              projects="10+"
            />
          </div>
          <div id="work">
            <WorkHighlights items={workHighlights} />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="education">
            <Education />
          </div>
        </div>
      </main>
    </div>
  );
}
