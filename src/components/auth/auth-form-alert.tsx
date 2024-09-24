import { Alert, AlertDescription } from '@/components/shadcnui/alert';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';

interface AuthFormAlertProps {
    success?: string;
    error?: string;
}

export default function AuthFormAlert({ success, error }: AuthFormAlertProps) {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? 'Войдите в аккаунт с помощью сервиса, которым вы в первый раз авторизировались'
            : '';

    return (
        <>
            {urlError && !error && (
                <Alert key="alert" variant="destructive">
                    <AlertDescription className="flex gap-x-2">
                        <HiOutlineExclamationCircle className="h-5 w-5 text-destructive" />
                        {urlError}
                    </AlertDescription>
                </Alert>
            )}
            {error && (
                <Alert key="alert" variant="destructive">
                    <AlertDescription className="flex gap-x-2">
                        <HiOutlineExclamationCircle className="h-5 w-5 text-destructive" />
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            {success && (
                <Alert key="alert">
                    <AlertDescription className="flex gap-x-2">
                        <HiOutlineCheckCircle className="h-5 w-5 text-emerald-500" />
                        {success}
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
}
