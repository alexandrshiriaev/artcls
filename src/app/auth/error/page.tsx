import { Button } from '@/components/ui/button';
import { authRoutes } from '@/routes';
import Link from 'next/link';

export default function AuthErrorPage() {
    return (
        <div className="max-w-lg w-fit mx-auto space-y-6">
            <h2 className="text-center text-2xl font-medium">
                Упс, кажется, что-то пошло не так :(
            </h2>
            <Button variant="outline" className="w-full" asChild>
                <Link href={authRoutes.SIGN_IN}>Вернуться обратно</Link>
            </Button>
        </div>
    );
}
