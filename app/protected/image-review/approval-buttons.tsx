"use client";

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';

export default function ApprovalButtons({ image_uuid }: { image_uuid: string }) {
    const supabase = createClient();
    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);

    const onApprove = async () => {
        // Add approval logic here
        await supabase.from('approvals').delete().eq('image_uuid', image_uuid);
        await supabase.from('approved').insert({ image_name: image_uuid });
        // Optionally, refresh the page or update the UI
        setApproved(true);
    }
    const onReject = async () => {
        await supabase.from('approvals').delete().eq('image_uuid', image_uuid);
        setRejected(true);
    }
    return <div>
        <Button variant={"default"} onClick={onApprove} disabled={approved || rejected}>
            {approved ? "Approved" : "Approve"}
        </Button>
        <Button variant={"destructive"} onClick={onReject} disabled={approved || rejected} style={{ marginLeft: "10px" }}>
            {rejected ? "Rejected" : "Reject"}
        </Button>
    </div>
}