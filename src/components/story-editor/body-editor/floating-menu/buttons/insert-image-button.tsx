import { useCurrentEditor } from '@tiptap/react';
import { useRef } from 'react';
import { LuImage } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import handleFile from '@/lib/image';

export default function InsertImageButton() {
    const { editor } = useCurrentEditor();

    const fileInputRef = useRef<HTMLInputElement>(null);

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target?.files?.[0];
        if (!file || !editor) return;
        handleFile(file, editor, editor.state.selection.anchor);
    }

    return (
        <>
            <input
                type="file"
                multiple={false}
                onChange={onFileChange}
                ref={fileInputRef}
                accept="image/png',image/jpeg,image/webp"
                hidden
            />
            <Button
                onClick={() => fileInputRef.current?.click()}
                title="Добавить изображение"
                variant="outline-ghost"
                size="icon"
                className="text-green-700"
            >
                <LuImage className="w-5 h-5 stroke-2" />
            </Button>
        </>
    );
}
