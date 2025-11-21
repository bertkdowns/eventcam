"use client";

import { createClient } from '@/lib/supabase/client';
import { useRef } from 'react';

export default function ImageUploader(){
    const supabase = createClient();

    // Upload file using standard upload
    async function uploadFile(file: File) {
        // generate random image path
        const filename = crypto.randomUUID();
        const { data, error } = await supabase.storage.from('images').upload(filename, file)
        if (error) {
            // Handle error
        } else {
            // Handle success
        }
    }

    async function uploadFiles(){
        if(!fileUploadRef.current) return;
        const e = fileUploadRef.current;
        const files = Array.from(e.files || []);
        for (const file of files) {
            await uploadFile(file);
        }
        // Redirect to "/done"
        window.location.href = "/done";
    }

    const fileUploadRef = useRef<HTMLInputElement>(null);

    return <div>

        <input
    type="file"
    ref={fileUploadRef}
    multiple
    accept="image/*"
    />

    <button onClick={uploadFiles}>
        Submit files
    </button>
        
    </div>
}