'use client';

import { EditorProvider } from '@tiptap/react';
import { options } from '@/components/story-editor/title-editor/title-editor-provider-attrs';

interface TitleEditorProps {
    editable: boolean;
}

export default function TitleEditor({ editable }: TitleEditorProps) {
    return <EditorProvider {...options} editable={editable}></EditorProvider>;
}
