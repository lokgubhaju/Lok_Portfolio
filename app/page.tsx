import IntroSection from "@/components/Intro/IntroSection";
import Experience from "@/components/Experience/Experience";
import Education from "@/components/Education/Education";
import WorkHighlights from "@/components/WorkHighlights/WorkHighlights";
import TechStack from "@/components/TechStack/TechStack";
import Contact from "@/components/Contact/Contact";
import { getPinnedRepos } from "@/lib/github";
import { SidebarTool } from "@/components/SidebarTool/SidebarTool";
import UserCard from "@/components/UserCard/UserCard";

export default async function Home() {
  const githubUsername = "lokgubhaju";

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
        <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40 w-[360px] lg:w-[480px]">
          <UserCard
            name="Lok Gubhaju"
            title="Frontend Engineer"
            description="I am a frontend engineer with a passion for building high-performance websites and digital experiences that drive results."
            linkedinUrl="https://www.linkedin.com/in/lokgubhaju/"
            githubUrl="https://github.com/lokgubhaju"
            email="lok.gubhaju@gmail.com"
            phone="+49-17643498973"
            address="Gilching, Germany"
          />
        </div>
        <div className="w-full relative px-4 sm:px-6 lg:px-8 md:max-w-[860px] mx-auto xl:ml-[520px] 2xl:mr-8 2xl:max-w-[1200px]">
          <SidebarTool />
          <div className="flex flex-col gap-16 lg:pr-16 mx-auto">
            <div id="home">
              <IntroSection
                name="Lok Gubhaju"
                title="Frontend Engineer"
                avatarSrc="/images/Lok_avatar.png"
                yearsExperience="4+"
                projects="15+"
              />
              <div id="user" className="block xl:hidden relative">
                <UserCard
                  name="Lok Gubhaju"
                  title="Frontend Engineer"
                  description="I am a frontend engineer with a passion for building high-performance websites and digital experiences that drive results."
                  linkedinUrl="https://www.linkedin.com/in/lokgubhaju/"
                  githubUrl="https://github.com/lokgubhaju"
                  email="lok.gubhaju@gmail.com"
                  phone="+49-17643498973"
                  address="Gilching, Germany"
                />
              </div>
            </div>
            <div id="education">
              <Education />
            </div>
            <div id="experience">
              <Experience />
            </div>
            <div id="work">
              <WorkHighlights items={workHighlights} />
            </div>
            <div id="tech">
              <TechStack className="p-1" />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
