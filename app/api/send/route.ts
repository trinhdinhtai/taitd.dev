import { EmailTemplate } from "@/components/email-template";
import { newsletterSchema } from "@/validators";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email } = newsletterSchema.parse(body);

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["taitd153.dev@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
      text: "",
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("[NEWSLETTER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
