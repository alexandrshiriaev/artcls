import SignInForm from '@/components/auth/sign-in-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SocialsAuthButtons from '@/components/auth/socials-auth-btns';

export default function SignInPage() {
    return (
        <>
            <div className="text-start xs:text-center mt-8">
                <h2>С возвращением!</h2>
                <p className="text-muted-foreground mt-2">
                    Введите свои учётные данные или выберите удобный Вам способ
                    авторизации.
                </p>
            </div>
            <div className="max-w-lg mx-auto mt-16">
                <SignInForm />
                <div className="text-sm flex flex-col sm:flex-row items-center gap-x-2 mt-4">
                    <span>Впервые на Artcls?</span>
                    <Button variant="ghost" asChild>
                        <Link href="/auth/signup">Создать аккаунт</Link>
                    </Button>
                </div>
                <SocialsAuthButtons page="signin" />
            </div>
        </>
    );
}
