'use client';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/auth/logout';
import { usePathname } from 'next/navigation';

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
