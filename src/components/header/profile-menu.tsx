import Link from 'next/link';

import { auth } from '@/auth';
import LogoutButton from '@/components/header/logout-btn';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/user-avatar';
import { publicRoutes } from '@/routes';

export default async function ProfileMenu() {
    const session = await auth();
    const isLoggedIn = session?.user?.name;

    if (!isLoggedIn) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-0">
                <UserAvatar
                    alt={session.user?.name}
                    src={session.user?.image}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link
                        href={`${publicRoutes.PROFILE}/@${session?.user.username}`}
                    >
                        Мой профиль
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
