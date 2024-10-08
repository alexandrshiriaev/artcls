import SignUpForm from '@/components/auth/sign-up-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SocialsAuthButtons from '@/components/auth/socials-auth-btns';

export default function SignUpPage() {
    return (
        <>
            <div className="text-start xs:text-center mt-8">
                <h2>Добро пожаловать!</h2>
                <p className="text-muted-foreground mt-2">
                    Введите свои учётные данные или выберите удобный Вам способ
                    для регистрации.
                </p>
            </div>
            <div className="max-w-lg mx-auto mt-4 sm:mt-8 md:mt-16">
                <SignUpForm />
                <div className="text-sm flex flex-col sm:flex-row items-center gap-x-2 mt-4">
                    <span>Уже есть аккаунт на Artcls?</span>
                    <Button variant="ghost" asChild>
                        <Link href="/auth/signin">Войти в аккаунт</Link>
                    </Button>
                </div>
                <SocialsAuthButtons page="signup" />
            </div>
        </>
    );
}
