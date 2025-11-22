import { createClient } from '@/lib/supabase/server';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SlideshowImage from './slideshow'

export default function SlideshowPage() {
    return <Suspense fallback={<div>Loading...</div>}>
        <Slideshow />
    </Suspense>;
}

async function Slideshow() {
    const supabase = await createClient(); // you have to use the server client to get the cookies!
    const { data: imagesToApprove } = await supabase.from("approved").select();
    const bucket = await supabase.storage.from('images');


    const images = await Promise.all(imagesToApprove?.map(async (img) => {
        const result = await bucket.createSignedUrl(img.image_name!, 60 * 60 * 24)
        const src = result.data?.signedUrl || null
        return src
    }) || [])

    return <div>
        <SlideshowImage items={images} />
    </div>
}