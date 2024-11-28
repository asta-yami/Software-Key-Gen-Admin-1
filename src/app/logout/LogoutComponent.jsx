'use client'

import { useRouter } from "next/navigation";
import { destroySession } from '../../../lib/actions'
import { useEffect } from "react";

export default function LogoutComponent() {

    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {

            destroySession();
            router.push('/authentication/login');
        };

        handleLogout();
    }, []);


    return (
        <div>LogoutComponent</div>
    )
}
