import React from 'react';
import { useEffect } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";

export default function Logout () {
    const supabase = useSupabaseClient();
    const router = useRouter();

    useEffect(() => {
        async function signOut() {
            const { error } = await supabase.auth.signOut();
            if(error) {
                console.log(error);
            }
        }

        signOut();
        router.push("/");
    }, []);
};