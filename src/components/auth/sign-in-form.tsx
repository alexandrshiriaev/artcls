'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadcnui/form';
import { Input } from '@/components/shadcnui/input';
import { Button } from '@/components/shadcnui/button';
import { signInSchema } from '@/lib/schemas/sign-in-schema';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { login } from '@/actions/login';
import FormResponse from '@/components/auth/form-response';
import SocialsButtons from '@/components/auth/socials-btns';
import { useSearchParams } from 'next/navigation';

export default function SignInForm() {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? 'Войдите в аккаунт с помощью сервиса, которым вы в первый раз авторизировались'
            : '';

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [isPending, startTransition] = useTransition();

    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');

    function onSubmit(values: z.infer<typeof signInSchema>) {
        startTransition(async () => {
            login(values).then(data => {
                setSuccess(data.success);
                setError(data.error);
            });
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="user@artcls.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="Введите пароль..."
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormResponse type={success ? 'success' : 'error'}>
                    {success || error || urlError}
                </FormResponse>
                <Button disabled={isPending} className="w-full" type="submit">
                    Войти
                </Button>
                <p className="text-sm">
                    Впервые на Artcls?
                    <Button variant="link" asChild>
                        <Link href="/auth/signup">Создать аккаунт</Link>
                    </Button>
                </p>
            </form>
            <SocialsButtons />
        </Form>
    );
}
