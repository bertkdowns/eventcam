import { createClient } from '@/lib/supabase/server';
import { Suspense } from 'react';
import SlideshowImage from './slideshow-image';

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
        return (
            <div key={img.id} style={{ marginBottom: "20px" }}>
                <p>{img.id}</p>
                {src && <SlideshowImage
                    src={src}
                />}
            </div>
        )
    }) || [])

    return <div>
        <h1>Images to approve</h1>
        {images}

    </div>
}