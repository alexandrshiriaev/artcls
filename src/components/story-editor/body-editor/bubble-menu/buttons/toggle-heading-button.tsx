import { useCurrentEditor } from '@tiptap/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ToggleHeadingButton() {
    const { editor } = useCurrentEditor();

    function onClick() {
        const isActive = editor?.isActive('heading', {
            level: 4,
        });

        let chain = editor?.chain().focus();

        if (!isActive) chain = chain?.setParagraph();

        chain?.toggleHeading({ level: 3 }).run();
    }

    return (
        <Button
            onClick={onClick}
            className={cn('px-1', {
                'text-emerald-400': editor?.isActive('heading', {
                    level: 3,
                }),
            })}
        >
            <span className="text-xl">T</span>
        </Button>
    );
}
