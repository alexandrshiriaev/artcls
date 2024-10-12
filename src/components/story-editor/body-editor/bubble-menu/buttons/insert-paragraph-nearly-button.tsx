import { useCurrentEditor } from '@tiptap/react';

import { Button } from '@/components/ui/button';

export default function InsertParagraphNearlyButton() {
    const { editor } = useCurrentEditor();

    function onClick() {
        editor?.chain().createParagraphNear().run();
    }

    return (
        <Button onClick={onClick} className="block sm:hidden">
            Добавить параграф
        </Button>
    );
}
