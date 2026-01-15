import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  DocumentCodeIcon,
  TaskDaily01Icon,
  Home01Icon,
  ComputerIcon,
} from "@hugeicons/core-free-icons";
import { usePathname } from "next/navigation";

export function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // After mounting, we can safely show the theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  const getLinkClasses = (path: string) => {
    const baseClasses =
      "flex items-center gap-1.5 transition-all duration-300 px-3 py-1.5 rounded-lg";
    const activeClasses =
      "bg-zen-grey-light-3 text-zen-white-1";
    const inactiveClasses =
      "text-zen-grey-mid-1 hover:bg-zen-grey-light-1 hover:text-zen-grey-dark-1";
 
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="glass sticky top-0 z-50 flex items-center justify-between border-b border-zen-grey-light-2 p-4">
      <div className="flex items-center gap-6">
        {/* Logo without link */}
        <div>
          {mounted ? (
            <Image
              src="/kronos-logo.png"
              alt="Kronos Agent Logo"
              width={100}
              height={30}
              className="h-8 w-auto drop-shadow-md"
            />
          ) : (
            <div className="h-8 w-[110px]" />
          )}
        </div>
        <div className="border-zen-grey-light-3 h-5 border border-l-[0.5px]"></div>
        <div className="flex items-center gap-2">
          <Link href="/" className={getLinkClasses("/")}>
            <HugeiconsIcon icon={Home01Icon} className="h-4 w-4" />
            <span className="text-sm">Home</span>
          </Link>
          <Link href="/tasks" className={getLinkClasses("/tasks")}>
            <HugeiconsIcon icon={TaskDaily01Icon} className="h-4 w-4" />
            <span className="text-sm">Tasks</span>
          </Link>
          <Link href="/desktop" className={getLinkClasses("/desktop")}>
            <HugeiconsIcon icon={ComputerIcon} className="h-4 w-4" />
            <span className="text-sm">Desktop</span>
          </Link>
          <Link
            href="https://docs.bytebot.ai/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className={getLinkClasses("https://docs.bytebot.ai")}
          >
            <HugeiconsIcon icon={DocumentCodeIcon} className="h-4 w-4" />
            <span className="text-sm">Docs</span>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-3"></div>
    </header>
  );
}
