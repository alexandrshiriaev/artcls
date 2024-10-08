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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signInSchema } from '@/lib/schemas/sign-in-schema';
import { Suspense, useState, useTransition } from 'react';
import { login } from '@/actions/auth/login';
import * as React from 'react';
import AuthFormAlert from '@/components/auth/auth-form-alert';

export default function SignInForm() {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>('');

    function onSubmit(values: z.infer<typeof signInSchema>) {
        startTransition(async () => {
            login(values).then(data => {
                if (data.error) {
                    setError(data.error);
                }
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder="mycoolpassword2000"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Suspense>
                        <AuthFormAlert error={error} />
                    </Suspense>
                </div>
                <Button
                    disabled={isPending}
                    className="w-full mt-8"
                    type="submit"
                >
                    Войти
                </Button>
            </form>
        </Form>
    );
}
