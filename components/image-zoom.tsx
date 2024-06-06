"use client"

import { ComponentPropsWithoutRef, ReactNode } from "react"
import Zoom from "react-medium-image-zoom"

import "react-medium-image-zoom/dist/styles.css"
import "@/styles/image-zoom.css"

interface ImageZoomProps extends ComponentPropsWithoutRef<typeof Zoom> {
  children: ReactNode
}

export default function ImageZoom({ children, ...rest }: ImageZoomProps) {
  return (
    <Zoom zoomMargin={40} {...rest}>
      {children}
    </Zoom>
  )
}
