"use client";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import s from "@/components/Experience/Experience.module.scss";
import Image from "next/image";
import Tag from "../Tag/Tag";

interface ExperienceItem {
  id: string;
  dateRange: string;
  logo?: React.ReactNode;
  title: string;
  company: string;
  description: string;
}

interface ExperienceProps {
  items?: ExperienceItem[];
}

const experienceItems: ExperienceItem[] = [
  {
    id: "1",
    dateRange: "August 2023 - Now",
    title: "Frontend Engineer",
    company: "SMAL GmbH, Munich",
    description:
      "Developed and maintained the frontend of the SMAL platform using React.js. The platform allows users to create and manage their own dynamic dashboards.",
  },
  {
    id: "2",
    dateRange: "Oct. 2021 - July 2023",
    title: "Frontend Developer (Internship & Working Student)",
    company: "SMAL GmbH, Munich",
    description:
      "Developed and maintained the frontend of the SMAL platform using Vue.js. The platform allows users to create and manage their own dynamic dashboards.",
  },
  {
    id: "3",
    dateRange: "May 2021 - July 2021",
    title: "Frontend Developer (Internship)",
    company: "DynAmaze AG, Köln",
    description:
      "Developed and maintained the frontend of the DynAmaze platform using Vue.js.",
  },
  {
    id: "4",
    dateRange: "Nov. 2020 - April 2021",
    title: "Master's Project (Monitoring & Visualization for Flows in Titan)",
    company: "wobe-systems GmbH, Kiel",
    description:
      "Developed a monitoring and visualization system for flows in Titan using React, Three.js, and D3.js. The system allows users to monitor and visualize the flows in Titan in real-time.",
  },
];

// Simple icon components for placeholders
const IconPlaceholder = ({ variant = 1 }: { variant?: number }) => {
  const icons = [
    // Ribbon/wave icon
    <svg
      key="1"
      viewBox="0 0 167 44"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.56211 33.8405C7.91991 32.9489 7.47415 31.8987 7.25505 30.705H0.175781C0.976639 38.8648 7.42882 43.806 17.4018 43.806C27.2236 43.806 33.366 38.9252 33.366 31.0828C33.366 21.2608 23.8993 19.7044 17.6133 18.7146C11.6824 17.8004 7.72348 16.8787 7.72348 12.9196C7.72348 9.24017 10.8287 7.19269 16.2005 7.19269C21.7536 7.19269 25.0854 9.60284 25.4859 13.8565H32.4291C32.0136 5.68915 25.8863 0.6875 16.276 0.6875C6.66574 0.6875 0.734867 5.49272 0.734867 13.1992C0.66687 22.9607 10.6927 24.5851 16.0645 25.4313C22.3504 26.4211 26.2338 27.2673 26.2338 31.4379C26.2338 35.1853 22.9095 37.3764 17.4018 37.3764C13.2539 37.3764 10.2243 36.1373 8.56211 33.8405ZM87.4765 42.4536L102.738 2.02482H110.936L126.054 42.4536H119.057L115.809 33.8329H97.7215L94.4727 42.4536H87.4765ZM99.9805 27.6829H113.542L106.765 9.7993L99.9805 27.6829ZM137.492 36.024V2.02482H130.428V42.5292H153.6V36.024H137.492ZM159.954 36.024V42.5292H166.316V36.024H159.954ZM61.3431 25.8469L49.1187 2.02481H39.5085V42.5292H46.6406V13.6903L58.2228 36.024H64.3652L76.023 13.6148V42.5216H83.0871V2.01726H73.5524L61.3431 25.8469Z"
        fill="currentColor"
      ></path>
    </svg>,
    <svg
      key="2"
      viewBox="0 0 167 44"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.56211 33.8405C7.91991 32.9489 7.47415 31.8987 7.25505 30.705H0.175781C0.976639 38.8648 7.42882 43.806 17.4018 43.806C27.2236 43.806 33.366 38.9252 33.366 31.0828C33.366 21.2608 23.8993 19.7044 17.6133 18.7146C11.6824 17.8004 7.72348 16.8787 7.72348 12.9196C7.72348 9.24017 10.8287 7.19269 16.2005 7.19269C21.7536 7.19269 25.0854 9.60284 25.4859 13.8565H32.4291C32.0136 5.68915 25.8863 0.6875 16.276 0.6875C6.66574 0.6875 0.734867 5.49272 0.734867 13.1992C0.66687 22.9607 10.6927 24.5851 16.0645 25.4313C22.3504 26.4211 26.2338 27.2673 26.2338 31.4379C26.2338 35.1853 22.9095 37.3764 17.4018 37.3764C13.2539 37.3764 10.2243 36.1373 8.56211 33.8405ZM87.4765 42.4536L102.738 2.02482H110.936L126.054 42.4536H119.057L115.809 33.8329H97.7215L94.4727 42.4536H87.4765ZM99.9805 27.6829H113.542L106.765 9.7993L99.9805 27.6829ZM137.492 36.024V2.02482H130.428V42.5292H153.6V36.024H137.492ZM159.954 36.024V42.5292H166.316V36.024H159.954ZM61.3431 25.8469L49.1187 2.02481H39.5085V42.5292H46.6406V13.6903L58.2228 36.024H64.3652L76.023 13.6148V42.5216H83.0871V2.01726H73.5524L61.3431 25.8469Z"
        fill="currentColor"
      ></path>
    </svg>,
    <Image
      key="3"
      src="/images/dynamaze_logo.jpeg"
      alt="Dynamaze logo"
      width={40}
      height={40}
    />,
    <Image
      key="4"
      src="/images/wobe_systems_logo.jpeg"
      alt="Wobe-systems logo"
      width={40}
      height={40}
    />,
  ];
  return icons[variant - 1] || icons[0];
};

export default function Experience({
  items = experienceItems,
}: ExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Track which items are currently visible in viewport
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // Cancel any pending animation frame to prevent stacking
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current || !timelineRef.current) return;

        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the section is in view
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // Start animation when section enters viewport
        // Progress from 0 to 1 as section scrolls through
        const startOffset = windowHeight * 0.2; // Start when 90% down the viewport
        const endOffset = windowHeight * 1;

        const totalScrollDistance = sectionHeight + startOffset - endOffset;
        const currentScroll = startOffset - sectionTop;

        const progress = Math.max(
          0,
          Math.min(1, currentScroll / totalScrollDistance)
        );
        setScrollProgress(progress);
      });
    };

    // Intersection Observer for individual items - handles both entering and leaving
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (id) {
            setVisibleItems((prev) => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(id);
              } else {
                next.delete(id);
              }
              return next;
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    // Observe items after a small delay to ensure they're rendered
    const observeTimer = setTimeout(() => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 150);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      clearTimeout(observeTimer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [items]);

  return (
    <section ref={sectionRef} className={cn(s["section-experience"])}>
      {/* Section Badge */}

      <Tag label="EXPERIENCE" iconName="WorkIcon" />

      {/* Timeline Container */}
      <div className={cn(s["section-experience__timeline-container"])}>
        {/* Timeline Line */}
        <div
          ref={timelineRef}
          className={cn(s["section-experience__timeline"])}
        >
          <div
            className={cn(s["section-experience__timeline-progress"])}
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Timeline Items */}
        <div className={cn(s["section-experience__items"])}>
          {items.map((item, index) => {
            const isVisible = visibleItems.has(item.id);
            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-id={item.id}
                className={cn(s["section-experience__item"], {
                  [s["section-experience__item--visible"]]: isVisible,
                })}
                style={{ "--delay": `${index * 0.15}s` } as React.CSSProperties}
              >
                {/* Date */}
                <div className={cn(s["section-experience__date"])}>
                  <span>{item.dateRange}</span>
                </div>

                {/* Dot on timeline */}
                <div className={cn(s["section-experience__dot-wrapper"])}>
                  <div
                    className={cn(s["section-experience__dot"], {
                      [s["section-experience__dot--active"]]: isVisible,
                    })}
                  />
                </div>

                {/* Content */}
                <div className={cn(s["section-experience__content"])}>
                  <div
                    className={cn(s["section-experience__logo"], "mb-[8px]")}
                  >
                    <IconPlaceholder variant={index + 1} />
                  </div>
                  <h3
                    className={cn(
                      s["section-experience__title"],
                      "text-black dark:text-white"
                    )}
                  >
                    {item.title}
                  </h3>
                  {item.company && (
                    <p
                      className={cn(
                        s["section-experience__company"],
                        "text-black dark:text-white/70"
                      )}
                    >
                      {item.company}
                    </p>
                  )}
                  <p
                    className={cn(
                      s["section-experience__description"],
                      "text-black dark:text-white/70"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
