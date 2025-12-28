"use client";

import Image from "next/image";
import { DownloadIcon, ArrowUpRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import cn from "classnames";
import s from "./UserCard.module.scss";
import Logo from "../Icon/Logo";
import SocialIcon from "../SocialIcon/SocialIcon";
import { TextRotator } from "../ui/TextRotator";

interface UserCardProps {
  name: string;
  title: string;
  description?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  certifications?: string[];
  languages?: string[];
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag: (
      command: string,
      ...args: Array<string | Record<string, unknown>>
    ) => void;
  }
}

export default function UserCard({ ...props }: UserCardProps) {
  const handleDownloadCV = () => {
    // Tracking download event with Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "download_cv", {
        event_category: "CV",
        event_label: "Lok_CV.pdf",
        value: 1,
      });
    }

    // Tracking event with dataLayer for GTM
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "download_cv",
        event_category: "CV",
        event_label: "Lok_CV.pdf",
      });
    }
  };

  const socialLinks = [
    { icon: "linkedin" as const, href: props.linkedinUrl, title: "LinkedIn" },
    { icon: "github" as const, href: props.githubUrl, title: "GitHub" },
    {
      icon: "mail" as const,
      href: props.email ? `mailto:${props.email}` : undefined,
      title: "Email",
    },
    {
      icon: "phone" as const,
      href: props.phone ? `tel:${props.phone}` : undefined,
      title: "Phone",
    },
  ].filter(({ href }) => Boolean(href));

  return (
    <div style={{ height: "calc(100vh - 200px)" }}>
      <div className="relative h-full w-full rounded-3xl overflow-hidden bg-[#63686F] dark:bg-white backdrop-blur-md">
        <div className="user-card-image w-full h-full p-4 relative">
          <Image
            src="/images/lok.jpg"
            alt="Lok Gubhaju"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl p-1.5 dark:block hidden"
          />
          <Image
            src="/images/Lok_2_compressed.jpg"
            alt="Lok Gubhaju light mode"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl p-1.5 dark:hidden block object-top"
          />
        </div>
        <div className="absolute left-[24px] top-[24px]">
          <Logo className="w-14 h-14" />
        </div>

        {/* top right icons */}
        <div className="absolute right-[24px] top-[24px] flex flex-col gap-2">
          {socialLinks.map(({ icon, href, title }) => (
            <SocialIcon key={icon} icon={icon} href={href} title={title} />
          ))}
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none">
          <div
            className={cn(
              s["available-for-work-container"],
              "relative h-[220px] w-[43px] flex items-center justify-center"
            )}
          >
            <Image
              src="/curve_dark.svg"
              alt="Available for work"
              fill
              className="dark:hidden object-contain"
              sizes="100px"
            />
            <Image
              src="/curve_light.svg"
              alt="Available for work"
              fill
              className="hidden dark:block object-contain"
              sizes="100px"
            />
            <span className="absolute inset-0 flex items-center justify-center text-sm [writing-mode:vertical-rl] rotate-180 text-white dark:text-black gap-2">
              <span
                className={cn(s["available-for-work-container__dot"])}
              ></span>
              Available for work
            </span>
          </div>
        </div>

        {/* bottom content */}
        <div className="absolute bottom-6 left-[24px] right-[24px]">
          <h1 className="text-black dark:text-white text-2xl font-bold min-h-8 flex items-center mb-6">
            Hey, I&apos;m{" "}
            <TextRotator
              texts={[props.name, props.title]}
              rotationInterval={3000}
              className="ml-2 text-[#22c55e]"
            />
          </h1>
          <p className="text-black dark:text-white text-sm">
            {props.description}
          </p>
          <div className="line-separator my-6 border-t border-gray-200 dark:border-gray-600"></div>
          <div className="flex items-center justify-between">
            <a href="#contact" className={cn(s["lets-talk-link"])}>
              <div className={cn(s["lets-talk-icon-wrap"], " w-10 h-10")}>
                <ArrowUpRightIcon className="size-4" />
              </div>
              <span
                className={cn(
                  s["lets-talk-text"],
                  "bg-[#22c55e] text-black p-2.5 rounded-full text-sm"
                )}
              >
                Let&apos;s talk
              </span>
              <div className={cn(s["lets-talk-icon-wrap"], " w-10 h-10")}>
                <ArrowUpRightIcon className="size-4" />
              </div>
            </a>
            <Button
              variant="default"
              className="text-black dark:text-white dark:hover:text-[#22c55e] hover:text-white text-sm p-2.5 rounded-full"
              asChild
            >
              <a
                href="/Lok_CV.pdf"
                download="Lok_Gubhaju_CV.pdf"
                onClick={handleDownloadCV}
              >
                <DownloadIcon className="w-4 h-4" /> Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
