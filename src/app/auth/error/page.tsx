import { Button } from '@/components/shadcnui/button';
import { authRoutes } from '@/routes';
import Link from 'next/link';

export default function AuthErrorPage() {
    return (
        <div>
            <h2>Упс, кажется что-то пошло не так :(</h2>
            <Button variant="link" className="p-0" asChild>
                <Link href={authRoutes.SIGN_IN}>Вернуться обратно</Link>
            </Button>
        </div>
    );
}
