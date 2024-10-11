import { uploadImage } from '@/actions/images/upload';

import type { Editor } from '@tiptap/core';

function uploadImageHandler(file: File): () => ReturnType<typeof uploadImage> {
    const formData = new FormData();
    formData.append('file', file);

    return async () => {
        return await uploadImage(formData);
    };
}

function insertImage(
    editor: Editor,
    attrs: {
        src: string | ArrayBuffer | null;
        alt?: string;
        title?: string;
        caption?: string;
        uploadImageHandler: ReturnType<typeof uploadImageHandler>;
    },
    pos: number,
) {
    if (!attrs.src) return;
    editor
        .chain()
        .insertContentAt(pos, {
            type: 'captionedImage',
            attrs,
        })
        .focus()
        .run();
}

export default function handleFile(file: File, editor: Editor, pos: number) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () =>
        insertImage(
            editor,
            {
                src: fileReader.result,
                uploadImageHandler: uploadImageHandler(file),
                alt: file.name,
            },
            pos,
        );
}
