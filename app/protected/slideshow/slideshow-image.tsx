'use client';

import test from "node:test";
import { useEffect, useState, useRef } from "react";

export default function FullscreenSlideshow({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const [currentIsVideo, setCurrentIsVideo] = useState(false);
  const videoRef = useRef(null);

  const current = items[index];

  // Detect by attempting to load as a video
  const isVideo = (url) => {
    // We will optimistically assume unknown types are video-capable
    // and rely on the video element failing
    const video = document.createElement("video");
    return video.canPlayType ? true : false;
  };
  const testIfImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

  useEffect(() => {
    testIfImage(current).then((isImage) => {
      setCurrentIsVideo(!isImage);
      if(isImage){
        const timer = setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
      }, 5000);
    
      } else {

      }
    });
    // preload next image/video by requesting it
    testIfImage(items[(index + 1) % items.length]);
  }, [current, items.length]);

  const onVideoEnded = () => {
    setIndex((i) => (i + 1) % items.length);
  }


  console.log("Rendering slideshow image:", current);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {!currentIsVideo ? (
    // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          className="w-full h-full object-contain"
          alt="slideshow"
        />
      ) : (
        <video
          ref={videoRef}
          src={current}
          className="w-full h-full object-contain"
          playsInline
          autoPlay
          onEnded={onVideoEnded}
        />
      )}
      
    </div>
  );
}
