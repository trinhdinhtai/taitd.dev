"use server"

import { revalidatePath } from "next/cache"
import { privateAction } from "@/actions/private-action"

import { getErrorMessage } from "@/lib/error"
import { prisma } from "@/lib/prisma"
import { createMessageSchema } from "@/lib/zod/schemas/message"

export const createMessage = async (formData: FormData) =>
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
