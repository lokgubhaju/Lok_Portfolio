"use client";

import { useRef, type ComponentProps } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import cn from "classnames";
import dynamic from "next/dynamic";
import s from "./TechStack.module.scss";
import Tag from "../Tag/Tag";
import ContentfulIcon from "../Icon/ContentfulIcon";
import DrupalIcon from "../Icon/DrupalIcon";
import TwigIcon from "../Icon/TwigIcon";
import BuilderIcon from "../Icon/BuilderIcon";
import SanityIcon from "../Icon/SanityIcon";
import { CodeXmlIcon } from "lucide-react";
import ResendIcon from "../Icon/ResendIcon";
type StackIconType = typeof import("tech-stack-icons")["default"];
type StackIconProps = ComponentProps<StackIconType>;

const StackIcon = dynamic<StackIconProps>(() => import("tech-stack-icons"), {
  ssr: false,
  loading: () => (
    <span className={cn(s["section-tech__icon"])} aria-hidden="true" />
  ),
});

interface TechItem {
  name: string;
  icon: string | React.ReactNode;
  variant?: "light" | "dark" | "grayscale";
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    title: "Languages",
    items: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "SASS", icon: "sass" },
      { name: "JavaScript", icon: "js" },
      { name: "TypeScript", icon: "typescript" },
      { name: "PHP", icon: "php" },
    ],
  },
  {
    title: "Frontend Frameworks",
    items: [
      { name: "Next.js", icon: "nextjs2" },
      { name: "React", icon: "react" },
      { name: "Vue.js", icon: "vuejs" },
      { name: "Angular", icon: "angular" },
      { name: "Alpine.js", icon: "alpinejs" },
    ],
  },
  {
    title: "Styling & UI",
    items: [
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Bootstrap", icon: "bootstrap5" },
      { name: "Storybook", icon: "storybook" },
    ],
  },
  {
    title: "Backend & CMS",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "GraphQL", icon: "graphql" },
      { name: "Contentful", icon: <ContentfulIcon /> },
      { name: "Builder.io", icon: <BuilderIcon /> },
      { name: "Sanity", icon: <SanityIcon /> },
      { name: "Twig", icon: <TwigIcon /> },
      { name: "Drupal", icon: <DrupalIcon /> },
      { name: "CakePHP", icon: "cakephp" },
      { name: "WordPress", icon: "wordpress" },
      { name: "Resend", icon: <ResendIcon /> },
    ],
  },
  {
    title: "Dev Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "Bitbucket", icon: "bitbucket" },
      { name: "GitHub", icon: "github" },
      { name: "GitLab", icon: "gitlab" },
      { name: "Cloudinary", icon: "cloudinary" },
      { name: "Figma", icon: "figma" },
      { name: "Postman", icon: "postman" },
      { name: "Vercel", icon: "vercel" },
      { name: "Netlify", icon: "netlify" },
      { name: "Docker", icon: "docker" },
      { name: "Notion", icon: "notion" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function TechStack({ className }: { className: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    amount: 0.2,
    margin: "0px 0px -100px 0px",
  });
  const { resolvedTheme } = useTheme();

  const getIconVariant = (
    itemVariant?: "light" | "dark" | "grayscale"
  ): "light" | "dark" | "grayscale" => {
    if (itemVariant === "grayscale") return "grayscale";
    return resolvedTheme === "light" ? "light" : "dark";
  };

  return (
    <section ref={sectionRef} className={cn(s["section-tech"], className)}>
      <div className={cn(s["section-tech__container"])}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Tag label="TECH STACK" lucideIcon={CodeXmlIcon} />
        </motion.div>

        <motion.div
          className={cn(s["section-tech__categories"], "flex flex-col gap-2.5")}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techCategories.map((category) => (
            <motion.div
              key={category.title}
              className={cn(s["section-tech__category"], "relative")}
              variants={categoryVariants}
            >
              <div className={cn(s["section-tech__category-header"])}>
                <span className={cn(s["section-tech__category-title"])}>
                  {category.title}
                </span>
                <div className={cn(s["section-tech__category-line"])} />
              </div>

              <div className={cn(s["section-tech__grid"])}>
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className={cn(s["section-tech__item"])}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    custom={index}
                  >
                    <div className={cn(s["section-tech__icon-wrapper"])}>
                      {typeof item.icon === "string" ? (
                        <StackIcon
                          name={item.icon}
                          className={cn(s["section-tech__icon"])}
                          variant={getIconVariant(item.variant)}
                        />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <span className={cn(s["section-tech__name"])}>
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
