"use client";

import cn from "classnames";
import Image from "next/image";
import s from "./WorkHighlights.module.scss";
import Tag from "../Tag/Tag";
import { Button } from "../ui/button";
import { ArrowUpRightIcon, CodeIcon } from "lucide-react";
import Link from "next/link";

interface WorkHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags?: string[];
  website?: string;
  projectLink?: string;
  year?: string;
}

interface WorkHighlightsProps {
  items?: WorkHighlight[];
}

const defaultHighlights: WorkHighlight[] = [
  {
    id: "card-1",
    title: "Darukaa",
    subtitle: "Bio-diversity Monitoring System",
    description:
      "A comprehensive dashboard platform enabling users to create, customize, and manage dynamic data visualizations with real-time updates.",
    image: "/images/screenshots/Darukaa_screenshot.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SCSS"],
    website: "https://darukaa.vercel.app/",
    projectLink: "https://github.com/lokgubhaju/Darukaa",
  },
  {
    id: "card-2",
    title: "Onlinekhabar",
    subtitle: "News Aggregator",
    description:
      "A news aggregator that collects and displays news articles from various sources.",
    image: "/images/screenshots/Onlinekhabar_screenshot.png",
    tags: ["HTML", "CSS", "JavaScript"],
    website: "https://lokgubhaju.github.io/Onlinekhabar/",
    projectLink: "https://github.com/lokgubhaju/Onlinekhabar",
  },
  {
    id: "card-3",
    title: "Arshia Portfolio",
    subtitle: "Portfolio Website",
    description:
      "A portfolio template.",
    image: "/images/screenshots/Arshia_screenshot.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    website: "https://lokgubhaju.github.io/Arshia-Portfolio/",
    projectLink: "https://github.com/lokgubhaju/Arshia-Portfolio",
  },
  {
    id: "card-4",
    title: "Brows Expert",
    subtitle: "Browser Extension",
    description:
      "A browser extension that allows you to browse the web with a custom search engine.",
    image: "/images/screenshots/Brows_screenshot.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    website: "https://lokgubhaju.github.io/Brows_Expert/",
    projectLink: "https://github.com/lokgubhaju/Brows_Expert",
  },
  {
    id: "card-5",
    title: "Bootstrap v5",
    subtitle: "Bootstrap v5 Template",
    description:
      "A Bootstrap v5 template.",
    image: "/images/screenshots/Bootstrap_screenshot.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    website: "https://lokgubhaju.github.io/Bootstrap-v5/",
    projectLink: "https://github.com/lokgubhaju/Bootstrap-v5",
  },
];

interface CardProps {
  item: WorkHighlight;
  index: number;
  totalItems: number;
}

const Card: React.FC<CardProps> = ({ item, index, totalItems }) => {
  // Fallback to placeholder if image URL is invalid or missing
  const imageSrc = item.image || "/images/placeholder_1.png";

  return (
    <li
      className={cn(s["card"])}
      id={item.id}
      style={
        {
          "--index": index,
          "--total": totalItems,
        } as React.CSSProperties
      }
    >
      <div className={cn(s["card-content"])}>
        {/* Image Section */}
        <figure className={cn(s["card-content__figure"])}>
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={cn(s["card-content__image"])}
          />
        </figure>

        {/* Text Section */}
        <div className={cn(s["card-content__text"])}>
          <div className="flex items-center justify-between mb-2">
            <span className={cn(s["card-content__index"])}>0{index + 1}</span>
          </div>
          <h3 className={cn(s["card-content__title"])}>{item.title}</h3>
          <p className={cn(s["card-content__subtitle"])}>{item.subtitle}</p>
          {item.tags && (
            <div className={cn(s["card-content__tags"])}>
              {item.tags.map((tag) => (
                <span key={tag} className={cn(s["card-content__tag"])}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {item.website && (
            <div
              className={cn(
                s["card-content__project-links"],
                "flex items-center gap-2 w-fit group"
              )}
            >
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(s["project-icon-wrap"])}
              >
                <ArrowUpRightIcon className="size-4" />
              </a>
              {item.projectLink && (
                <Button variant="secondary" className={cn(s["project-button"])}>
                  <Link
                    href={item.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <CodeIcon className="size-4" /> View Project
                  </Link>
                </Button>
              )}
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(s["project-icon-wrap"])}
              >
                <ArrowUpRightIcon className="size-4" />
              </a>
              {item.year && (
                <span className="text-sm rounded-full bg-[#22c55e] p-2 text-black">
                  {item.year}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default function WorkHighlights({
  items = defaultHighlights,
}: WorkHighlightsProps) {
  return (
    <section className={cn(s["work-highlights"])}>
      <div className={cn(s["work-highlights__header"])}>
        <Tag label="WORK HIGHLIGHTS" iconName="LayersIcon" />
        <h2 className={cn(s["work-highlights__heading"])}>Featured Projects</h2>
        <p
          className={cn(
            s["work-highlights__subheading"],
            "text-black dark:text-white/50"
          )}
        >
          A selection of projects that showcase my expertise in building modern,
          performant web applications.
        </p>
      </div>

      <ul
        className={cn(s["work-highlights__cards"])}
        style={{ "--card-count": items.length } as React.CSSProperties}
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            item={item}
            index={index}
            totalItems={items.length}
          />
        ))}
      </ul>
    </section>
  );
}
