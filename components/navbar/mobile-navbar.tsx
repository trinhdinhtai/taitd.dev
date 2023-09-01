"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { siteMetadata } from "@/lib/metadata";
import { ScrollArea } from "../ui/scroll-area";
import { navigationLinks } from "@/constants/navbar-links";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="top" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
          aria-label="Go to Home"
        >
          <span className="font-bold">{siteMetadata.title.default}</span>
        </MobileLink>
        <ScrollArea className="my-4 max-h-96 overflow-y-scroll pb-10">
          <div className="flex flex-col space-y-3">
            {navigationLinks?.map((item) =>
              item.content ? (
                <div
                  className="order-1 mt-3 flex flex-col space-y-3"
                  key={item.title.trim()}
                >
                  <p className="font-bold">{item.title}</p>
                  {item.content.map((subItem) => (
                    <MobileLink
                      key={subItem.href}
                      href={subItem.href}
                      onOpenChange={setOpen}
                    >
                      {subItem.title}
                    </MobileLink>
                  ))}
                </div>
              ) : (
                <MobileLink
                  key={item.href}
                  href={item.href as string}
                  onOpenChange={setOpen}
                >
                  {item.title}
                </MobileLink>
              )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const pathname = usePathname();
  if (href.toString().startsWith("http")) {
    return (
      <a
        href={href.toString()}
        onClick={() => {
          onOpenChange?.(false);
        }}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(
        className,
        href.toString() !== "/" &&
          pathname.substring(2).startsWith(href.toString().substring(2)) &&
          "font-semibold text-accent-foreground"
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export default MobileNavbar;
