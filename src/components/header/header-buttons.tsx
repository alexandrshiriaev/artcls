import Link from 'next/link';

import { HiOutlineBell, HiOutlinePencilSquare } from 'react-icons/hi2';

import { auth } from '@/auth';
import ProfileMenu from '@/components/header/profile-menu';
import { Button } from '@/components/ui/button';
import { authRoutes, privateRoutes } from '@/routes';

export default async function HeaderButtons() {
    const session = await auth();
    const isLoggedIn = !!session?.user;

    return (
        <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-4">
                <Button variant="ghost" className="flex gap-x-2 p-0" asChild>
                    <Link href={privateRoutes.NEW_STORY}>
                        <HiOutlinePencilSquare className="w-6 h-6" />
                        <span className="flex">Написать</span>
                    </Link>
                </Button>
                {isLoggedIn ? (
                    <Button variant="ghost" size="icon">
                        <HiOutlineBell className="w-6 h-6" />
                    </Button>
                ) : (
                    <>
                        <Button variant="outline" asChild>
                            <Link href={authRoutes.SIGN_IN}>Войти</Link>
                        </Button>
                        <Button>
                            <Link href={authRoutes.SIGN_UP}>Войти</Link>
                        </Button>
                    </>
                )}
            </div>
            <ProfileMenu />
        </div>
    );
}
