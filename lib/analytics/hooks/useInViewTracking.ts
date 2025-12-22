"use client";

import { useEffect, useRef } from "react";
import { trackSectionView } from "@/lib/analytics";

/**
 * Hook to track when a section comes into view using Intersection Observer
 * @param sectionName - Name of the section to track
 * @param threshold - Percentage of the element that needs to be visible (0-1)
 * @returns ref - Ref to attach to the element you want to track
 * 
 * @example
 * ```tsx
 * const AboutSection = () => {
 *   const sectionRef = useInViewTracking('About Section');
 *   return <section ref={sectionRef}>...</section>;
 * };
 * ```
 */
export function useInViewTracking(
  sectionName: string,
  threshold: number = 0.5
) {
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          trackSectionView(sectionName);
          hasTracked.current = true;
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [sectionName, threshold]);

  return ref;
}

