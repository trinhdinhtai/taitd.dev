import { allPosts } from "@/.contentlayer/generated";
import { HeroSection } from "@/components/hero-section";
import PostCard from "@/components/posts/post-card";
import { siteMetadata } from "@/lib/metadata";
import { sortByDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
        <div className="grid grid-cols-1 place-items-start justify-between gap-12 lg:grid-cols-3">
          <div className="col-span-1 w-full lg:col-span-2">
            <div className="grid grid-flow-row gap-2">
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
          {/* <aside className="w-full">
            <Sidebar />
          </aside> */}
        </div>
      </div>
    </div>
  );
}
