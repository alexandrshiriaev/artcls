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
import { useState, useTransition } from 'react';
import { register } from '@/actions/register';
import { Alert, AlertDescription } from '@/components/shadcnui/alert';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import * as React from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi2';

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
