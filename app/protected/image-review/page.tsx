import { createClient } from '@/lib/supabase/server';
import { Suspense } from 'react';
import MyImage from './image';

export default function Instruments() {
    return <Suspense fallback={<div>Loading...</div>}>
        <InstrumentsList />
    </Suspense>;
}

async function InstrumentsList() {
    const supabase = await createClient(); // you have to use the server client to get the cookies!
    const { data: imagesToApprove } = await supabase.from("approvals").select();
    const bucket = await supabase.storage.from('images');


    const images = await Promise.all(imagesToApprove?.map(async (img) => {
        const result = await bucket.createSignedUrl(img.image_uuid, 60 * 60 * 24)
        const src = result.data?.signedUrl || null
        return (
            <div key={img.id} style={{ marginBottom: "20px" }}>
                <h3>Image ID: {img.id}</h3>
                {src && <MyImage
                    src={src}
                />}
                <p>{img.created_at}</p>
            </div>
        )
    }) || [])

    return <div>
        <h1>Images to approve</h1>
        {images}

    </div>
}