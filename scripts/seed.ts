const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

async function main() {
  try {
    await database.stack.createMany({
      data: [{ name: "Next.js" }, { name: "React" }, { name: "Git" }],
    })
    await database.project.createMany({
      data: [
        {
          title: "Personal portfolio",
          description:
            "My personal portfolio website, built with Next.js, Tailwind CSS, and TypeScript. It's a place where I can showcase my work and share my thoughts.",
          imageUrl: "/images/projects/blog.png",
          githubUrl: "https://github.com/trinhdinhtai/next-blog",
          isFeature: true,
        },
        {
          title: "Background snippets",
          description:
            "Collections of ready-to-use, simply copy and paste into your next project. All snippets crafted with Tailwind CSS and Vanilla CSS for easy integration.",
          imageUrl: "/images/projects/bg-snippets.png",
          githubUrl: "https://github.com/trinhdinhtai/next-bg-snippets",
          isFeature: true,
        },
      ],
    })

    console.log("Success")
  } catch (error) {
    console.log("Error seeding the database project", error)
  } finally {
    await database.$disconnect()
  }
}

main()
