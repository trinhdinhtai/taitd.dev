"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { toast } from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { Input } from "./ui/input";

interface NewsletterSubscribeProps {
  title: string;
  description?: string;
  buttonText: string;
}

const formSchema = z.object({
  email: z.string().email(),
});

const NewsletterSubscribe = ({
  title,
  description,
  buttonText,
  className,
  ...props
}: NewsletterSubscribeProps & HTMLAttributes<HTMLDivElement>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    });

    if (!response?.ok) {
      return toast.error("The subscription did not happen. Please try again.");
    }

    return toast("You'll get the emails now.");
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
              <Button type="submit" variant="secondary">
                <Mail className="mr-2 h-4 w-4" /> {buttonText}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
