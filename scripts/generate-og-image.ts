#!/usr/bin/env tsx
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

import {
  LOGO_MARK_VIEWBOX,
  logoMarkIsometricSvg,
  ogGuideLinesSvg,
  type LogoMarkTheme,
} from "../lib/logo-mark-isometric-static"

async function main() {
  const root = process.cwd()
  const OG_WIDTH = 1200
  const OG_HEIGHT = 630
  const PADDING = 80

  const theme: LogoMarkTheme = "dark"
  const svg = logoMarkIsometricSvg({ theme, includeGuides: false })
  const logoPng = await sharp(Buffer.from(svg)).png().toBuffer()
  const logoMeta = await sharp(logoPng).metadata()

  if (!logoMeta.width || !logoMeta.height) {
    throw new Error("Failed to read logo dimensions")
  }

  const maxLogoWidth = OG_WIDTH - PADDING * 2
  const maxLogoHeight = OG_HEIGHT - PADDING * 2
  const scale = Math.min(
    maxLogoWidth / logoMeta.width,
    maxLogoHeight / logoMeta.height
  )
  const logoWidth = Math.round(logoMeta.width * scale)
  const logoHeight = Math.round(logoMeta.height * scale)
  const left = Math.round((OG_WIDTH - logoWidth) / 2)
  const top = Math.round((OG_HEIGHT - logoHeight) / 2)

  const resizedLogo = await sharp(logoPng)
    .resize(logoWidth, logoHeight, { fit: "inside" })
    .png()
    .toBuffer()

  const guidesSvg = ogGuideLinesSvg({
    width: OG_WIDTH,
    height: OG_HEIGHT,
    logoLeft: left,
    logoTop: top,
    logoScale: logoWidth / LOGO_MARK_VIEWBOX.width,
    theme,
  })
  const guidesPng = await sharp(Buffer.from(guidesSvg)).png().toBuffer()

  const imagesDir = path.join(root, "public/images")
  fs.mkdirSync(imagesDir, { recursive: true })

  const svgPath = path.join(imagesDir, "logo-mark-isometric.svg")
  const ogPath = path.join(imagesDir, "og.png")

  fs.writeFileSync(
    svgPath,
    logoMarkIsometricSvg({ theme, includeGuides: true })
  )

  await sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 4,
      background: "#09090b",
    },
  })
    .composite([
      { input: guidesPng, left: 0, top: 0 },
      { input: resizedLogo, left, top },
    ])
    .png()
    .toFile(ogPath)

  console.log(`Wrote ${path.relative(root, svgPath)}`)
  console.log(`Wrote ${path.relative(root, ogPath)} (${OG_WIDTH}x${OG_HEIGHT})`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
