'use client';

import LandingHeader from '@/components/landing/header';
import { Button } from '@/components/shadcnui/button';
import Link from 'next/link';
import { authRoutes } from '@/routes';

export default function LandingPage() {
    return (
        <div className="h-screen flex flex-col">
            <LandingHeader />
            <main className="flex-grow flex items-center">
                <div className="max-w-screen-xl flex-grow mx-auto">
                    <h1 className="text-6xl font-medium">
                        Делитесь идеями. <br />
                        Вдохновляйте мир.
                    </h1>
                    <p className="text-2xl max-w-[410px] mt-4">
                        Пишите, читайте и обсуждайте идеи с миллионами
                        единомышленников.
                    </p>
                    <Button size={'lg'} className="mt-8" asChild>
                        <Link href={authRoutes.SIGN_UP}>
                            Присоединиться бесплатно
                        </Link>
                    </Button>
                </div>
            </main>
        </div>
    );
}
