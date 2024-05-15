import { db } from "@/server/db"

export const getMessages = async () => {
  const messages = await db.guestbook.findMany({
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
