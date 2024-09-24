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
import { useState, useTransition } from 'react';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/shadcnui/alert';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import * as React from 'react';

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

    const [error, setError] = useState<string | undefined>(urlError);

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
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription className="flex gap-x-2">
                                <HiOutlineExclamationCircle className="h-5 w-5 text-destructive" />
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}
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
