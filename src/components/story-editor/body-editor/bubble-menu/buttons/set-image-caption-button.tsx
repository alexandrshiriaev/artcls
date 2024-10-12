import { useCurrentEditor } from '@tiptap/react';

import { Button } from '@/components/ui/button';

export default function SetImageCaptionButton() {
    const { editor } = useCurrentEditor();

    function onClick() {
        const caption = prompt('Введите новую подпись к изображению: ');
        if (caption) {
            editor
                ?.chain()
                .updateAttributes('captionedImage', {
                    caption,
                })
                .run();
        }
    }

    return <Button onClick={onClick}>Подпись</Button>;
}
