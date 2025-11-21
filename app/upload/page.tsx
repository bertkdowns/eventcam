import { createClient } from '@/utils/supabase/server';
import { randomUUID } from 'crypto';
import { Suspense } from 'react'; 
import ImageUploader from './image-uploader';

export default async function UploadImageFiles() {
  return <Suspense fallback={<div>Loading...</div>}>
    <ImageUploader />
  </Suspense>;
}

