import { auth } from '@/auth';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadcnui/dropdown-menu';
import UserAvatar from '@/components/header/user-avatar';
import LogoutButton from '@/components/header/logout-btn';

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
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
