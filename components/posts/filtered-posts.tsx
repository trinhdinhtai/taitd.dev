"use client"

import { ChangeEvent, useState } from "react"
import { Post } from "@/.contentlayer/generated"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PostCard from "@/components/post-card"

interface FilteredPostProps {
  posts: Post[]
}

export default function FilteredPost({ posts }: FilteredPostProps) {
  const [searchValue, setSearchValue] = useState("")

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <div className="relative my-8">
        <Input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search articles"
          aria-label="Search articles"
          className="w-full pl-12"
          id="search"
        />

        <Label htmlFor="search">
          <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        </Label>
      </div>

      {filteredPosts.length ? (
        <div className="grid gap-10 lg:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="my-24 text-center text-lg">No posts found</div>
      )}
    </>
  )
}
