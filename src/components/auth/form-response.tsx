import { cn } from '@/lib/utils';

interface FormMessageProps {
    type: 'success' | 'error';
    children?: string;
}

export default function FormResponse({ type, children }: FormMessageProps) {
    if (!children?.length) return null;

    return (
        <div
            className={cn('w-full rounded-md p-4', {
                'bg-destructive/15 text-destructive': type === 'error',
                'bg-emerald-500/15 text-emerald-500': type === 'success',
            })}
        >
            {children}
        </div>
    );
}
