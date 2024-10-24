'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { Suspense, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { register } from '@/actions/auth/register';
import AuthFormAlert from '@/components/auth/auth-form-alert';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { clientSignUpSchema } from '@/lib/schemas/sign-up-schema';

import type { z } from 'zod';

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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder="alexandr.alexandrov@artcls.com"
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
                                        placeholder="Александр Александров"
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
                                        placeholder="mycoolpassword2000"
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
                                        placeholder="mycoolpassword2000"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Suspense>
                        <AuthFormAlert error={error} success={success} />
                    </Suspense>
                </div>
                <Button
                    disabled={isPending}
                    className="w-full mt-8"
                    type="submit"
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Form>
    );
}
