'use client';

import { Button } from '@/components/shadcnui/button';
import { FaGithub } from 'react-icons/fa';
import { loginWithProvider } from '@/actions/login';

interface SocialsAuthButtonsProps {
    page: 'signin' | 'signup';
}

export default function SocialsAuthButtons({ page }: SocialsAuthButtonsProps) {
    async function onClick(provider: 'github') {
        await loginWithProvider(provider);
    }

    return (
        <div className="w-full space-y-2 mt-4">
            <Button
                size="lg"
                variant="outline"
                className="w-full relative hover:bg-primary hover:text-primary-foreground"
                onClick={() => onClick('github')}
            >
                <span className="hidden xs:inline">
                    {page === 'signup'
                        ? 'Зарегистрироваться с помощью'
                        : 'Войти с помощью'}
                </span>
                <span className="ml-1">GitHub</span>
                <FaGithub className="absolute left-4 w-5 h-5" />
            </Button>
        </div>
    );
}
