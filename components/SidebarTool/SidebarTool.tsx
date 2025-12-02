"use client";

import { ThemeToggle } from "@/app/ThemeToggle";
import {
  Home,
  User,
  Briefcase,
  Sparkles,
  GraduationCap,
  ArrowUp,
  LayersIcon,
  Send,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "experience", icon: Sparkles, label: "Experience" },
  { id: "work", icon: Briefcase, label: "Work" },
  { id: "tech", icon: LayersIcon, label: "Tech Stack" },
  { id: "contact", icon: Send, label: "Contact" },
];

export const SidebarTool = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: item.id,
              top: rect.top,
              bottom: rect.bottom,
            };
          }
          return null;
        })
        .filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      const viewportMiddle = window.innerHeight / 2;

      // Find the section that is closest to the viewport middle
      const active = sections.reduce((closest, section) => {
        const sectionMiddle = (section.top + section.bottom) / 2;
        const distance = Math.abs(sectionMiddle - viewportMiddle);
        const closestDistance = Math.abs(
          (closest.top + closest.bottom) / 2 - viewportMiddle
        );
        return distance < closestDistance ? section : closest;
      }, sections[0]);

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 flex flex-col items-center gap-4 z-50">
      <ThemeToggle />

      <div className="flex flex-col gap-3 p-2 rounded-3xl bg-white/50 dark:bg-black/50 backdrop-blur-md border border-gray-200/10 shadow-lg outline-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <div key={item.id} className="group relative">
              {index === navItems.length - 1 && (
                <div className="h-px bg-white/50 my-1 mx-2" />
              )}
              <a
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`
                  relative w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "text-[#22c55e]"
                      : "text-gray-400 hover:text-[#22c55e]"
                  }
                `}
                aria-label={item.label}
                title={item.label}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-[#22c55e]" : ""}`}
                />
              </a>
              {/* Tooltip pill */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100  transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                <div className="px-3 py-1.5 rounded-full bg-gray-900/90 dark:bg-white dark:text-black backdrop-blur-sm border border-white/10 text-white text-sm font-medium shadow-lg">
                  {item.label}
                </div>
              </div>
              {index === 0 && <div className="h-px bg-white/50 my-1 mx-2" />}
            </div>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={
          "relative rounded-full w-14 h-14 bg-white/50 dark:bg-black/50 hover:text-[#22c55e] backdrop-blur-md border shadow-lg cursor-pointer transition-all duration-300 p-2"
        }
        onClick={(e) => {
          e.stopPropagation();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ArrowUp
          className="absolute h-10 w-10 transition-all"
          width={32}
          height={32}
        />
      </Button>
    </div>
  );
};
