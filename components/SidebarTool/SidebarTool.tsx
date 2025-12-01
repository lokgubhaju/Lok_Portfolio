"use client";

import { ThemeToggle } from "@/app/ThemeToggle";
import { Home, User, Briefcase, Sparkles, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "work", icon: Briefcase, label: "Work" },
  { id: "experience", icon: Sparkles, label: "Experience" },
  { id: "education", icon: GraduationCap, label: "Education" },
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

      <div className="flex flex-col gap-1 p-2 rounded-full bg-white/50 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/10 shadow-lg outline-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <div key={item.id} className="group relative">
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
                <Icon className={`w-5 h-5 ${isActive ? "text-[#22c55e]" : ""}`} />
              </a>
              {/* Tooltip pill on hover */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                <div className="px-3 py-1.5 rounded-full bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/10 text-white text-sm font-medium shadow-lg">
                  {item.label}
                </div>
              </div>
              {index < navItems.length - 1 && (
                <div className="h-px bg-white/5 my-1 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
