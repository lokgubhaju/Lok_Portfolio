"use client";
import Image from "next/image";
import cn from "classnames";
import s from "@/components/Intro/IntroSection.module.scss";
import Tag from "../Tag/Tag";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface IntroSectionProps {
  name?: string;
  title?: string;
  avatarSrc?: string;
  yearsExperience?: string;
  projects?: string;
}

export default function IntroSection({
  name,
  title,
  avatarSrc,
  yearsExperience,
  projects,
}: IntroSectionProps) {
  return (
    <div className={cn(s["section-intro"], "text-black dark:text-white")}>
      {/* Header */}
      <header className={cn(s["section-intro__header"])}>
        <Image
          src={avatarSrc || ""}
          alt={name || ""}
          width={48}
          height={48}
          className={cn(s["section-intro__avatar"])}
        />
        <div className={cn(s["section-intro__header-info"])}>
          <h1
            className={cn(
              s["section-intro__name"],
              "text-black dark:text-white"
            )}
          >
            {name || ""}
          </h1>
          <p
            className={cn(
              s["section-intro__title"],
              "text-black dark:text-white/50"
            )}
          >
            {title || ""}
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={cn(s["section-intro__hero-section"], "flex flex-col")}
      >
        <h2 className={cn(s["section-intro__hero-text"], "font-poppins")}>
          I&apos;m building high-performance {`  `}
          <span className={cn(s["section-intro__highlight"])}>websites</span>
          <br />
          <span className={cn(s["section-intro__highlight-alt"])}>
            & digital experiences
          </span>{" "}
          that drive results.
        </h2>
        <Player
          src="/images/developer.json"
          loop
          autoplay
          className="w-[600px] h-[600px] m-0!"
        />
      </section>

      <section className={cn(s["section-intro__stats-section"])}>
        <div className={cn(s["section-intro__stat-item"])}>
          <span className={cn(s["section-intro__stat-number"])}>
            {yearsExperience || ""}
          </span>
          <span className={cn(s["section-intro__stat-label"])}>
            Year of experience
          </span>
        </div>
        <div className={cn(s["section-intro__stat-item"])}>
          <span className={cn(s["section-intro__stat-number"])}>
            {projects || ""}
          </span>
          <span className={cn(s["section-intro__stat-label"])}>Projects</span>
        </div>
      </section>
      <section id="about" className={cn(s["section-intro__about-section"])}>
        <Tag label="About me" iconName="UserIcon" />
        <div
          className={cn(
            s["section-intro__about-content"],
            "flex flex-col gap-3"
          )}
        >
          <h3 className="text-4xl">Frontend Engineer</h3>
          <p className={cn(s["section-intro__about-description"])}>
            I&apos;m a Frontend Engineer specializing in building
            high-performance websites and scalable interfaces with Next.js,
            TypeScript, and modern CMS platforms. I&apos;ve delivered impactful
            digital experiences for brands like Elgato, Corsair, Vodafone, and
            Playboy—improving accessibility, performance, and user engagement
            through thoughtful engineering. My work spans everything from API
            integrations, interactive components, and responsive UI development
            to accessibility audits and conversion-driven landing pages.
          </p>
        </div>
      </section>
    </div>
  );
}
