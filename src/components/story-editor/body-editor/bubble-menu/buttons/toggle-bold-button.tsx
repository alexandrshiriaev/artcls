import { useCurrentEditor } from '@tiptap/react';
import { LuBold } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ToggleBoldButton() {
    const { editor } = useCurrentEditor();

    function onClick() {
        editor?.chain().focus().toggleBold().run();
    }

    return (
        <Button
            onClick={onClick}
            className={cn('p-0 duration-50 transition-colors', {
                'text-emerald-400': editor?.isActive('bold'),
            })}
        >
            <LuBold className="w-5 h-5" />
        </Button>
    );
}
