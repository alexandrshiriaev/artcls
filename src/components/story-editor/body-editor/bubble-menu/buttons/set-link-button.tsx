import { useCurrentEditor } from '@tiptap/react';
import { LuLink } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SetLinkButton() {
    const { editor } = useCurrentEditor();

    function onClick() {
        const previousUrl = editor?.getAttributes('link').href;
        let url = prompt('Введите URL: ', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        if (!url.startsWith('https://') || !url.startsWith('http://')) {
            url = 'https://' + url;
        }

        editor
            ?.chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    }

    return (
        <Button
            onClick={onClick}
            className={cn('p-0 duration-50 transition-colors', {
                'text-emerald-400': editor?.isActive('link'),
            })}
        >
            <LuLink className="w-5 h-5" />
        </Button>
    );
}
