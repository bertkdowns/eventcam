import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

export default async function Instruments() {
  return <Suspense fallback={<div>Loading...</div>}>
    <InstrumentsList />
  </Suspense>;
}

async function InstrumentsList(){
    const supabase = await createClient();
    const { data: instruments } = await supabase.from("instruments").select();
    return <pre>{JSON.stringify(instruments, null, 2)}</pre>
}