"use server"

import { revalidatePath } from "next/cache"
import { privateAction } from "@/actions/private-action"

import { getErrorMessage } from "@/lib/error"
import { prisma } from "@/lib/prisma"
import { createMessageSchema } from "@/lib/zod/schemas/message"

const createMessage = async (formData: FormData) =>
  privateAction(async (user) => {
    const { id } = user

    if (!id) {
      return {
        message: "User not found.",
        error: true,
      }
    }

    const parsedData = createMessageSchema.safeParse({
      message: formData.get("message") ?? "",
    })

    if (!parsedData.success) {
      return {
        message: parsedData.error.issues[0]!.message,
        error: true,
      }
    }

    const { message } = parsedData.data

    try {
      await prisma.guestbook.create({
        data: {
          message,
          userId: id,
        },
      })
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true,
      }
    }

    revalidatePath("/guestbook")

    return {
      message: "Message created.",
    }
  })

const deleteMessage = async (id: string) =>
  privateAction(async (user) => {
    const { id: userId } = user

    const message = await prisma.guestbook.findUnique({
      where: { id, userId },
      select: { userId: true },
    })

    if (!message) {
      return {
        message: "Message not found.",
        error: true,
      }
    }

    try {
      await prisma.guestbook.delete({
        where: { id },
      })
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true,
      }
    }

    revalidatePath("/guestbook")

    return {
      message: "Message deleted.",
    }
  })

export { createMessage, deleteMessage }
