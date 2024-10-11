'use client';

import { usePathname } from 'next/navigation';

import { logout } from '@/actions/auth/logout';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
    const pathname = usePathname();

    return (
        <Button
            className="w-full flex flex-col items-center justify-center hover:"
            variant="ghost"
            onClick={() => {
                logout(pathname);
            }}
        >
            <p>Выйти из аккаунта</p>
        </Button>
    );
}
