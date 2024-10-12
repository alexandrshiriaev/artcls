import { useCurrentEditor } from '@tiptap/react';
import { LuSeparatorHorizontal } from 'react-icons/lu';

import { Button } from '@/components/ui/button';

export default function InsertHrButton() {
    const { editor } = useCurrentEditor();

    return (
        <Button
            onClick={() => editor?.chain().setHorizontalRule().run()}
            title="Добавить новую часть"
            variant="outline-ghost"
            size="icon"
            className="text-green-700"
        >
            <LuSeparatorHorizontal className="w-5 h-5 stroke-2" />
        </Button>
    );
}
