"use client";

import { createClient } from '@/lib/supabase/client';
import { ChangeEventHandler, useRef, useState } from 'react';
import { Button } from '../../components/ui/button';

export default function ImageUploader() {
    const supabase = createClient();
    const [submitting, setSubmitting] = useState(false);
    const [fileNames, setFileNames] = useState<string[]>([]);


    const handleFileChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.target.files;
        if (!files) {
            setFileNames([]);
            return;
        }
        const names = Array.from(files).map((file) => file.name);
        setFileNames(names);
    };

    // Upload file using standard upload
    async function uploadFile(file: File) {
        // generate random image path
        const filename = crypto.randomUUID();
        const { error } = await supabase.storage.from('images').upload(filename, file)
        if (error) {
            // Handle error
        } else {
            // Handle success
            await supabase.from('approvals').insert({ image_uuid: filename });
        }
    }

    async function uploadFiles() {
        setSubmitting(true);
        if (!fileUploadRef.current) return;
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
            className='hidden'
            type="file"
            ref={fileUploadRef}
            multiple
            accept="image/*,video/*"
            id='file-upload'
            onChange={handleFileChange}

        />
        <label htmlFor='file-upload' className='cursor-pointer underline'>
            <div className="w-full h-[50vh] p-10 items-center">
                <div className=' border boerdr-3 w-full h-full border-gray-400 border-dashed p-10 pt-40 text-center'>

                    {fileNames.length == 0 && <div>
                        <p>Choose files from your device</p>
                    </div>
                    }
                    <ul>

                        {fileNames.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul></div>


            </div>
        </label>

        <div className='text-center'>
            <Button onClick={uploadFiles} disabled={submitting}>
                {submitting ? "Submitting.." : "Add to the event!"}
            </Button>
        </div>
    </div>
}