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
import { clientSignUpSchema } from '@/lib/schemas/sign-up-schema';
import Link from 'next/link';
import FormResponse from '@/components/auth/form-response';
import { useState, useTransition } from 'react';
import { register } from '@/actions/register';

export default function SignUpForm() {
    const form = useForm<z.infer<typeof clientSignUpSchema>>({
        resolver: zodResolver(clientSignUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
        },
    });

    const [isPending, startTransition] = useTransition();

    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');

    function onSubmit(values: z.infer<typeof clientSignUpSchema>) {
        startTransition(async () => {
            register(values).then(data => {
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя пользователя</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="Artcls user"
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
                                    type="password"
                                    placeholder="Введите пароль..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Подтвердите пароль</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    placeholder="Введите пароль..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormResponse type={success ? 'success' : 'error'}>
                    {success || error}
                </FormResponse>
                <Button disabled={isPending} className="w-full" type="submit">
                    Зарегистрироваться
                </Button>
                <p className="text-sm">
                    Уже есть аккаунт на Artcls?
                    <Button variant="link" asChild>
                        <Link href="/auth/signin">Войти в аккаунт</Link>
                    </Button>
                </p>
            </form>
        </Form>
    );
}
