import { createClient } from '@/lib/supabase/client';
import { Suspense } from 'react';
import Image from 'next/image';

export default function Instruments() {
  return <Suspense fallback={<div>Loading...</div>}>
    <InstrumentsList />
  </Suspense>;
}

async function InstrumentsList(){
    const supabase = createClient();
    const { data: imagesToApprove } = await supabase.from("approvals").select();
    console.log("imagesToApprove", imagesToApprove);
    const bucket = await supabase.storage.from('images');

    return <div>
        <h1>Images to approve</h1>
        {imagesToApprove?.map((img) => (
            <div key={img.id} style={{marginBottom: "20px"}}>
                <h3>Image ID: {img.id}</h3>
                <Image
                    src={bucket.getPublicUrl(img.image_uuid).data.publicUrl}
                    alt={`Image ${img.id}`}
                    width={400}
                    height={400}
                />
                <p>{img.created_at}</p>
            </div>
        ))}

    </div>
}