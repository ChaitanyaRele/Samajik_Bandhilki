"use client"

import { useState } from "react"

interface ActivityImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
}

export function ActivityImage({
  src,
  alt,
  className,
  fallbackSrc = "/placeholder.svg?height=300&width=300",
}: ActivityImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    setImgSrc(fallbackSrc)
  }

  return <img src={imgSrc || "/placeholder.svg"} alt={alt} className={className} onError={handleError} />
}
