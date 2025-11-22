"use client";

export default function Image({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Reviewed Image" style={{ maxWidth: '400px', height: 'auto' }} />
  );
}