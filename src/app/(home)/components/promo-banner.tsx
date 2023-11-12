import Image, { ImageProps } from "next/image";

export function PromoBanner({alt, ...props}: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      width={0}
      height={0}
      className="h-auto w-full px-5"
      sizes="100vw"
    />
  )
}