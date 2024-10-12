import { useCurrentEditor } from '@tiptap/react';
import { LuQuote } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ToggleQuotesButton() {
    const { editor } = useCurrentEditor();

    function onClick() {
        const isActive = editor?.isActive('blockquote');

        let chain = editor?.chain().focus();

        if (!isActive) chain = chain?.setParagraph();

        chain?.toggleBlockquote().run();
    }

    return (
        <Button
            onClick={onClick}
            className={cn('p-0 duration-50 transition-colors', {
                'text-emerald-400': editor?.isActive('blockquote'),
            })}
        >
            <LuQuote className="w-5 h-5" />
        </Button>
    );
}
