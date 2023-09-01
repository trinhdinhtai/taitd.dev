"use client";

import { AVATAR_URL } from "@/constants";
import { defaultAuthor } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNavbar from "./mobile-navbar";
import MainNavbar from "./main-navbar";
import { ThemeToggle } from "../theme-toggle";
import { CommandShortcutDialog } from "../command-dialog";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <header
        className={cn(
          "fixed inset-x-0 z-20 mx-auto mb-4 px-4 transition-all duration-1000 animate-out sm:top-0 sm:h-16 sm:px-0 sm:transition-none",
          visible && "top-4 animate-in"
        )}
      >
        <div className="flex items-center gap-2 rounded-full border-b border-foreground/25 bg-background/95 px-3 py-2 shadow-md supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:bg-clip-padding supports-[backdrop-filter]:backdrop-blur sm:justify-between sm:rounded-none sm:px-3">
          <div className="container mx-auto flex max-w-6xl">
            <div className="flex items-center justify-start">
              <div className="group aspect-square h-auto w-10 overflow-hidden rounded-full">
                <Link href="/" aria-label="Go to Home">
                  <Image
                    className="duration-300 group-hover:scale-110"
                    width={40}
                    height={40}
                    src={AVATAR_URL}
                    alt={defaultAuthor.name}
                  />
                </Link>
              </div>
            </div>

            <div className="order-3 sm:order-2 sm:ml-auto">
              <nav className="ml-auto hidden space-x-6 text-sm font-medium sm:block sm:w-full">
                <MainNavbar />
              </nav>
              <nav className="sm:hidden">
                <MobileNavbar />
              </nav>
            </div>

            <div className="order-2 flex w-full items-center gap-2 sm:order-3 sm:w-fit">
              <CommandShortcutDialog />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
