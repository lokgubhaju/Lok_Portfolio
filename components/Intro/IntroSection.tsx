import Image from "next/image";
import cn from "classnames";
import s from "@/components/Intro/IntroSection.module.scss";
import Tag from "../Tag/Tag";

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
        <h2 className={cn(s["section-intro__hero-text"])}>
          I&apos;m building{" "}
          <span className={cn(s["section-intro__highlight"])}>websites</span>
          <br />
          <span className={cn(s["section-intro__highlight-alt"])}>
            & brands
          </span>{" "}
          that people
          <br />
          remember
        </h2>

        {/* Decorative Ribbon - Can be replaced with actual 3D element */}
        <div className={cn(s["section-intro__ribbon-container"])}>
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="ribbonGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>
            <path
              d="M50 150 Q100 100 200 120 T350 100 Q400 150 350 200 T200 220 Q100 200 50 150"
              stroke="url(#ribbonGradient)"
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse
              cx="280"
              cy="180"
              rx="80"
              ry="80"
              stroke="url(#ribbonGradient)"
              strokeWidth="35"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
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
            I&apos;m a frontend engineer with a passion for building websites
            and brands that people remember.
          </p>
        </div>
      </section>
    </div>
  );
}
