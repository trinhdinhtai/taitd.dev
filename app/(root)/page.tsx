import Link from "next/link";
import { allPosts } from "@/.contentlayer/generated";
import { ArrowRight } from "lucide-react";

import { siteMetadata } from "@/lib/metadata";
import { sortByDate } from "@/lib/utils";
import { HeroSection } from "@/components/hero-section";
import NewsletterSubscribe from "@/components/newsletter-subscribe";
import PostCard from "@/components/posts/post-card";

export default function Home() {
  const posts = allPosts
    .filter((post) => post.status === "published")
    .sort(sortByDate)
    .slice(0, siteMetadata.postsOnHomePage);
  return (
    <div className="pb-10">
      <HeroSection
        title={`Building hackin’ cool digital products around the world 🌴.`}
      />

      <div className="container mt-12 max-w-6xl">
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <Link
          href="/posts"
          className="mt-10 flex items-center py-2 text-sm text-accent-foreground underline-offset-4 hover:text-muted-foreground hover:underline"
        >
          See all posts <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {siteMetadata.newsletterUrl && (
        <NewsletterSubscribe
          title="I also write deep dives in email"
          description="I write about coding, design, digital nomad life, and solopreneurship. Join over 1,000 other developers in
            getting better in business. Unsubscribe whenever."
          buttonText="Send me the emails"
        />
      )}
    </div>
  );
}
