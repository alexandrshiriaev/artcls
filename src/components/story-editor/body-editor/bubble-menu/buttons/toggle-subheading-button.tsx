import { useCurrentEditor } from '@tiptap/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ToggleSubheadingButton() {
    const { editor } = useCurrentEditor();

    function onClick() {
        const isActive = editor?.isActive('heading', {
            level: 4,
        });

        let chain = editor?.chain().focus();

        if (!isActive) chain = chain?.setParagraph();

        chain?.toggleHeading({ level: 4 }).run();
    }

    return (
        <Button
            onClick={onClick}
            className={cn('px-1 py-0 duration-50 transition-colors', {
                'text-emerald-400': editor?.isActive('heading', {
                    level: 4,
                }),
            })}
        >
            <span className="text-lg">T</span>
        </Button>
    );
}
