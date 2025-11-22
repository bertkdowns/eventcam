'use client'

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const SlideshowImage = dynamic(() => import('./slideshow-image'), {
  ssr: false,
});

// This is just so hopefully the slideshow-image component is rendered on the client side

export default function SlideshowPage({items}: {items: string[]}) {
    return <Suspense fallback={<div>Loading...</div>}>
        <SlideshowImage items={items} />
    </Suspense>;
}
