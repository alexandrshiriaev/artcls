import { auth } from '@/auth';
import ProfileMenu from '@/components/header/profile-menu';
import { Button } from '@/components/shadcnui/button';
import { HiOutlineBell, HiOutlinePencilSquare } from 'react-icons/hi2';

export default async function HeaderButtons() {
    const session = await auth();
    const isLoggedIn = !!session?.user;

    return (
        <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-4">
                <Button variant="ghost" className="flex gap-x-2 p-0">
                    <HiOutlinePencilSquare className="w-6 h-6" />
                    <span className="flex">Написать</span>
                </Button>
                {isLoggedIn ? (
                    <Button variant="ghost" size="icon">
                        <HiOutlineBell className="w-6 h-6" />
                    </Button>
                ) : (
                    <>
                        <Button variant="outline">Войти</Button>
                        <Button>Начать</Button>
                    </>
                )}
            </div>
            <ProfileMenu />
        </div>
    );
}
