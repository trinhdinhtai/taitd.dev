const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

async function main() {
  try {
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
