import "./env.mjs"

import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "onur.dev",
      "leerob.io",
    ],
  },
}

export default withContentlayer(nextConfig)
