import type { NextConfig } from "next"

import "./env"

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
}

export default nextConfig
