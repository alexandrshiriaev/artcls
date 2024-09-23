import { Playfair } from 'next/font/google';
import { cn } from '@/lib/utils';

const playfair = Playfair({
    weight: ['700'],
    subsets: ['latin'],
});

export default function Logo() {
    return (
        <span className={cn(['font-bold text-4xl', playfair.className])}>
            Artcls
        </span>
    );
}
