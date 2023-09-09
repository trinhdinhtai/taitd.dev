import Image from "next/image";
import { defaultAuthor } from "@/lib/metadata";
import { AVATAR_URL } from "@/constants";

interface HeroSectionProps {
  title: string;
}

export function HeroSection({ title }: HeroSectionProps) {
  return (
    <div className="container flex max-w-5xl flex-col items-center justify-center text-center sm:py-20 md:py-32">
      <h1 className="font-heading mb-2 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <div className="flex content-center items-center justify-center">
        <Image
          className="aspect-square h-10 w-10 rounded-full border border-black"
          width={40}
          height={40}
          src={AVATAR_URL}
          alt={defaultAuthor.name}
        />
        <p className="ml-2 font-bold text-muted-foreground">
          {defaultAuthor.handle}
        </p>
      </div>
    </div>
  );
}
