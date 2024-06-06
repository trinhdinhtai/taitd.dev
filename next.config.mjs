import { fileURLToPath } from "node:url"
import createJiti from "jiti"
import { withContentlayer } from "next-contentlayer"

const jiti = createJiti(fileURLToPath(import.meta.url))

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./env")

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
}

export default withContentlayer(nextConfig)
