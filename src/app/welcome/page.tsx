'use client';

import Link from 'next/link';

import LandingHeader from '@/components/landing/header';
import { Button } from '@/components/ui/button';
import { authRoutes } from '@/routes';

export default function LandingPage() {
    return (
        <div className="h-screen flex flex-col">
            <LandingHeader />
            <main className="flex-grow flex items-center">
                <div className="container flex-grow mx-auto">
                    <h1 className="text-4xl md:text-6xl font-medium">
                        Делитесь идеями. <br />
                        Вдохновляйте мир.
                    </h1>
                    <p className="text-xl sm:text-2xl max-w-[410px] mt-4">
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
