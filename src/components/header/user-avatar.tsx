'use client';
import { useState } from 'react';
import Image from 'next/image';

import { Skeleton } from '@/components/shadcnui/skeleton';

interface UserAvatarProps {
    src?: string | null;
    alt: string;
}

export default function UserAvatar({ src, alt }: UserAvatarProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!src)
        return <div className="w-10 h-10 rounded-full bg-slate-600"></div>;

    return (
        <div className="w-10 h-10 rounded-full overflow-hidden relative">
            {!imageLoaded && (
                <Skeleton className="w-full h-full rounded-full" />
            )}
            <Image
                src={src}
                alt={alt}
                width={40}
                height={40}
                onLoad={() => {
                    setImageLoaded(true);
                }}
            />
        </div>
    );
}
