"use client";

import { useState, useEffect } from "react";

export default function ImageComponent({ src }: { src: string }) {
  const [isImage, setIsImage] = useState(true);

  const testIfImage = (url: string) => {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  useEffect(() => {
    testIfImage(src).then((isImage) => {
      setIsImage(isImage);
    });
  }, [src]);


  return isImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Reviewed Image" style={{ maxWidth: '400px', height: 'auto' }} />
  ) : (
    <video src={src} controls style={{ maxWidth: '400px', height: 'auto' }} />
  )
}