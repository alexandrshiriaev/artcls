import { Button } from '@/components/shadcnui/button';
import Link from 'next/link';
import { authRoutes } from '@/routes';

export default function LandingHeaderButtons() {
    return (
        <div className="space-x-4">
            <Button variant={'ghost'} asChild>
                <Link href={authRoutes.SIGN_IN}>Войти</Link>
            </Button>
            <Button asChild>
                <Link href={authRoutes.SIGN_UP}>Начать</Link>
            </Button>
        </div>
    );
}
