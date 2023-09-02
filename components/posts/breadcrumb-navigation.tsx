import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BreadcrumbNavigationProps {
  title: string;
}

const BreadcrumbNavigation = ({ title }: BreadcrumbNavigationProps) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="hidden items-center gap-1 text-sm text-muted-foreground md:flex md:flex-row"
      >
        <li>
          <Link
            href="/"
            className="block transition hover:text-muted-foreground/70"
            aria-label="Go to Home"
          >
            <span className="sr-only"> Home </span>
            <Home size={14} />
          </Link>
        </li>

        <ChevronRight size={14} />

        <li>
          <Link
            href="/posts"
            className="block transition hover:text-muted-foreground/70"
          >
            Blog
          </Link>
        </li>

        <ChevronRight size={14} />

        <li>
          <Link
            href="#"
            className="block transition hover:text-muted-foreground/70"
          >
            {title}
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;
