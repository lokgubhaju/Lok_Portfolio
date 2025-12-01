"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle ({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <Button variant="outline" size="icon" className={cn("relative rounded-full w-12 h-12 cursor-pointer transition-all duration-300 p-2", className)} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Sun className="absolute h-10 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" width={32} height={32}/>
      <Moon className="absolute h-10 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" width={32} height={32}/>
    </Button>
  );
}