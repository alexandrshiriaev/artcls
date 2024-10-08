'use client';
import { useState } from 'react';
import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';

interface UserAvatarProps {
    src?: string | null;
    alt: string;
    width?: number;
    height?: number;
}

export default function UserAvatar({
    src,
    alt,
    width,
    height,
}: UserAvatarProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!src)
        return (
            <div
                className={`${!width ? 'w-10' : ''} ${!height ? 'h-10' : ''} rounded-full bg-slate-600`}
                style={{ width: width, height: height }}
            ></div>
        );

    return (
        <div
            className={`${!width ? 'w-10' : ''} ${!height ? 'h-10' : ''} rounded-full overflow-hidden relative`}
            style={{ width: width, height: height }}
        >
            {!imageLoaded && (
                <Skeleton className="w-full h-full rounded-full" />
            )}
            <Image
                src={src}
                alt={alt}
                width={width || 40}
                height={height || 40}
                onLoad={() => {
                    setImageLoaded(true);
                }}
            />
        </div>
    );
}
