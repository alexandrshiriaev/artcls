import Link from 'next/link';

import { publicRoutes } from '@/routes';

import Logo from '../../components/ui/logo';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="flex justify-center items-center py-4">
                <Link href={publicRoutes.WELCOME}>
                    <Logo />
                </Link>
            </header>
            <main className="container">{children}</main>
        </>
    );
}
