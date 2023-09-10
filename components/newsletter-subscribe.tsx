"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Input } from "./ui/input";
import axios from "axios";
import { newsletterSchema } from "@/validators";
import { siteMetadata } from "@/lib/metadata";
import Link from "next/link";

interface NewsletterSubscribeProps {
  title: string;
  description?: string;
  buttonText: string;
}

const NewsletterSubscribe = ({
  title,
  description,
  buttonText,
  className,
  ...props
}: NewsletterSubscribeProps & HTMLAttributes<HTMLDivElement>) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newsletterSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/send", {
        email: values.email,
      });
      toast.success("Thanks for subscribing!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={cn(
        "relative isolate my-24 overflow-hidden bg-secondary py-6 text-secondary-foreground",
        className,
      )}
      {...props}
    >
      <div className="p-8 md:p-12">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>

          <p className="hidden text-muted-foreground sm:mt-4 sm:block">
            {description}
          </p>
        </div>

        {/* Form */}
        <div className="mx-auto mt-8 max-w-xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-3 md:flex-row"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-auto">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="taitd153.dev@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default" disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" /> {buttonText}
              </Button>
            </form>
          </Form>

          {siteMetadata.newsletterUrl && (
            <div className="mt-4 flex items-center justify-center">
              <Button asChild variant="ghost">
                <Link href={siteMetadata.newsletterUrl} target="_blank">
                  Let me read it first <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#gradient)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient
            id="gradient"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(512 512) rotate(90) scale(512)"
          >
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>
    </section>
  );
};

export default NewsletterSubscribe;
