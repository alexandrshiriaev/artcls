'use client';
import { Button } from '@/components/shadcnui/button';
import { logout } from '@/actions/logout';

export default function LogoutButton() {
    return (
        <Button
            variant="outline"
            onClick={() => {
                logout();
            }}
        >
            Выйти
        </Button>
    );
}
