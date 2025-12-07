"use client";

import * as React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import cn from "classnames";

interface TextRotatorProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
}

export function TextRotator({
  texts,
  rotationInterval = 3000,
  className,
}: TextRotatorProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [texts.length, rotationInterval]);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(4px)",
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <span className={cn(className, "inline-flex")}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex items-center"
        >
          {texts[index].split("").map((char, i) => (
            <motion.span
              key={i}
              variants={child}
              className={cn("inline-block", char === " " ? "w-[0.25em]" : "")}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </span>
  );
}
