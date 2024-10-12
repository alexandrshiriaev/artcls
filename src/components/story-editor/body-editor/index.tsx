'use client';

import { EditorProvider } from '@tiptap/react';

import { options } from '@/components/story-editor/body-editor/body-editor-provider-attrs';
import BubbleMenu from '@/components/story-editor/body-editor/bubble-menu';
import FloatingMenu from '@/components/story-editor/body-editor/floating-menu';

interface BodyEditorProps {
    editable: boolean;
}

export default function BodyEditor({ editable }: BodyEditorProps) {
    return (
        <>
            <EditorProvider
                {...options}
                editable={editable}
                content={
                    typeof window !== 'undefined'
                        ? localStorage.getItem('body-content')
                        : ''
                }
            >
                <FloatingMenu editor={null} />
                <BubbleMenu editor={null} />
            </EditorProvider>
        </>
    );
}
