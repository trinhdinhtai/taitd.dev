"use client"

import { useState } from "react"
import { contactSchema } from "@/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { siteConfig } from "@/config/site"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import SectionHeading from "./ui/section-heading"
import { Textarea } from "./ui/textarea"

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    setIsLoading(true)
    try {
      await axios.post("/api/send", {
        email: values.email,
      })
      toast.success("Thanks for subscribing!")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.section
      id="contact"
      className="mb-20 text-center sm:mb-28"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="-mt-6 text-muted-foreground">
        Please contact me directly at{" "}
        <a className="underline" href={`mailto:${siteConfig.links.mail}`}>
          {siteConfig.links.mail}
        </a>{" "}
        or through this form.
      </p>

      <div className="mx-auto mt-8 max-w-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-auto">
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-auto">
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              disabled={isLoading}
              className="group"
            >
              <Icons.send className="mr-2 h-4 w-4" /> Submit
            </Button>
          </form>
        </Form>
      </div>
    </motion.section>
  )
}

export default Contact
