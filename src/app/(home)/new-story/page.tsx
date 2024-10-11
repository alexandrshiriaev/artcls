'use client';

import { useSearchParams } from 'next/navigation';

import StoryEditor from '@/components/story-editor';

export default function NewStoryPage() {
    const searchParams = useSearchParams();

    const previewParam = searchParams.get('preview');
    const editable = !(
        previewParam &&
        (previewParam === '' || previewParam.toLowerCase() === 'true')
    );

    return (
        <main className="story-container">
            <StoryEditor editable={editable} />
        </main>
    );
}
