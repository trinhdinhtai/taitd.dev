import { prisma } from "@/lib/prisma"

export const getMessages = async () => {
  const messages = await prisma.guestbook.findMany({
    select: {
      id: true,
      message: true,
      createdAt: true,
      userId: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return messages
}
