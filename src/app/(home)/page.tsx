import { auth } from '@/auth';
import Link from 'next/link';
import { Button } from '@/components/shadcnui/button';
import LogoutButton from '@/components/header/logout-btn';
import Image from 'next/image';

export default async function Home() {
    const session = await auth();

    return (
        <div className="w-full border-b py-4">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl">Artcls</h2>
                    <div>
                        {!!session ? (
                            <div className="flex gap-x-2 items-center">
                                <div>
                                    <p className="text-sm font-bold">
                                        {session.user?.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {session.user?.email}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-600">
                                    {session.user?.image && (
                                        <Image
                                            src={session.user?.image}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                            alt={`${session.user?.name} avatar`}
                                        />
                                    )}
                                </div>
                                <LogoutButton />
                            </div>
                        ) : (
                            <Button asChild>
                                <Link href="/auth/signin">Войти</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
