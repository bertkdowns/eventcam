"use client";

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';

export default function DeleteButton({ image_uuid }: { image_uuid: string }) {
    const supabase = createClient();
    const [rejected, setRejected] = useState(false);

    const onDelete = async () => {
        await supabase.from('approved').delete().eq('image_name', image_uuid);
        await supabase.storage.from('images').remove([image_uuid]);
        setRejected(true);
    }
    return <div>
        <Button variant={"destructive"} onClick={onDelete} disabled={ rejected} style={{ marginLeft: "10px" }}>
            {rejected ? "Deleted" : "Delete"}
        </Button>
    </div>
}