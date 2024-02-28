import { Project } from "@/types"

export const projectsData: Project[] = [
  {
    title: "Personal portfolio",
    description:
      "My personal portfolio website, built with Next.js, Tailwind CSS, and TypeScript. It's a place where I can showcase my work and share my thoughts.",
    tags: ["React", "Next.js", "TailwindCSS", "ShadcnUI", "Prisma"],
    imageUrl: "/images/projects/blog.png",
    githubUrl: "https://github.com/trinhdinhtai/next-blog",
  },
  {
    title: "Background snippets",
    description:
      "Collections of ready-to-use, simply copy and paste into your next project. All snippets crafted with Tailwind CSS and Vanilla CSS for easy integration.",
    tags: ["React", "Next.js", "TailwindCSS", "ShadcnUI"],
    imageUrl: "/images/projects/bg-snippets.png",
    githubUrl: "https://github.com/trinhdinhtai/next-bg-snippets",
  },
]
