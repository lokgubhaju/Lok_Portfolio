"use client";

import GithubIcon from "../Icon/GithubIcon";
import LinkedInIcon from "../Icon/LinkedInIcon";
import { MailIcon, PhoneIcon } from "lucide-react";
import { trackSocialClick } from "@/lib/analytics";

const ICONS = {
  linkedin: LinkedInIcon,
  github: GithubIcon,
  mail: MailIcon,
  phone: PhoneIcon,
} as const;

type IconKey = keyof typeof ICONS;

interface SocialIconProps {
  icon?: IconKey;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
}

const SocialIcon = ({ icon, href, target, rel, title }: SocialIconProps) => {
  if (!icon || !href) {
    return null;
  }

  const IconComponent = ICONS[icon];
  const fallbackLabel = title ?? icon;

  const handleClick = () => {
    trackSocialClick(icon, "click");
  };

  return (
    <a
      href={href}
      target={target ?? "_blank"}
      rel={rel ?? "noopener noreferrer"}
      title={fallbackLabel}
      aria-label={fallbackLabel}
      onClick={handleClick}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-black/50 overflow-hidden hover:text-green-500"
    >
      <span className="relative flex size-5 items-center justify-center overflow-hidden">
        <IconComponent className="size-5 absolute transition-transform duration-200 ease-out group-hover:-translate-y-full motion-reduce:transition-none motion-reduce:transform-none" />
        <IconComponent className="size-5 absolute translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0 motion-reduce:transition-none motion-reduce:transform-none" />
      </span>
    </a>
  );
};

export default SocialIcon;
