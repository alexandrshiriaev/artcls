import { useCurrentEditor } from '@tiptap/react';
import { LuBraces } from 'react-icons/lu';

import { Button } from '@/components/ui/button';

export default function InsertCodeBlockButton() {
    const { editor } = useCurrentEditor();

    return (
        <Button
            onClick={() => editor?.chain().toggleCodeBlock().run()}
            title="Добавить блок кода"
            variant="outline-ghost"
            size="icon"
            className="text-green-700"
        >
            <LuBraces className="w-5 h-5 stroke-2" />
        </Button>
    );
}
