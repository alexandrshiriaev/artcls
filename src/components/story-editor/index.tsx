import BodyEditor from '@/components/story-editor/body-editor';
import TitleEditor from '@/components/story-editor/title-editor';

import '@/components/story-editor/styles.scss';

import {
    JetBrains_Mono,
    Source_Sans_3,
    Source_Serif_4,
} from 'next/font/google';

import { cn } from '@/lib/utils';

interface StoryEditorProps {
    editable: boolean;
}

const jetbrainsMono = JetBrains_Mono({
    subsets: [
        'latin',
        'cyrillic',
        'greek',
        'vietnamese',
        'latin-ext',
        'cyrillic-ext',
    ],
    variable: '--font-story-code',
});

const sourceSerif4 = Source_Serif_4({
    subsets: [
        'latin',
        'cyrillic',
        'greek',
        'vietnamese',
        'latin-ext',
        'cyrillic-ext',
    ],
    weight: ['400'],
    variable: '--font-story-serif',
});

const sourceSans3 = Source_Sans_3({
    subsets: [
        'latin',
        'cyrillic',
        'greek',
        'vietnamese',
        'latin-ext',
        'cyrillic-ext',
    ],
    weight: ['400'],
    variable: '--font-story-sans',
});

export default function StoryEditor({ editable }: StoryEditorProps) {
    return (
        <div
            className={cn(
                'space-y-16 xs:space-y-8 mt-8',
                sourceSerif4.variable,
                jetbrainsMono.variable,
                sourceSans3.variable,
            )}
        >
            <TitleEditor editable={editable} />
            <BodyEditor editable={editable} />
        </div>
    );
}
