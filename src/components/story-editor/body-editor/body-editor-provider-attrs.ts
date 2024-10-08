// @ts-ignore
import { UseEditorOptions } from '@tiptap/react/src/useEditor';
// @ts-ignore
import { Extensions } from '@tiptap/core/src/types';
import { Editor } from '@tiptap/core';
import { EditorProps } from '@tiptap/pm/view';
import Link from '@tiptap/extension-link';

import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import FileHandler from '@/components/story-editor/body-editor/extensions/file-handler';
import CaptionedImage from '@/components/story-editor/body-editor/extensions/captioned-image';
import CodeBlockLowlight from '@/components/story-editor/body-editor/extensions/code-block-lowlight';

const starterKitExtension = StarterKit.configure({
    heading: {
        levels: [3, 4],
    },
    codeBlock: false,
});

const placeholderExtension = Placeholder.configure({
    placeholder: ({ node }) => {
        if (node.type.name === 'paragraph')
            return 'Напишите содержание статьи...';

        if (node.type.name === 'captionedImage')
            return 'Напишите подпись к изображению...';

        return '';
    },
});

const captionedImageExtension = CaptionedImage;

const fileHandlerExtension = FileHandler;

const codeBlockLowLightExtension = CodeBlockLowlight;

const linkExtension = Link.configure({
    defaultProtocol: 'https',
    autolink: true,
    openOnClick: 'whenNotEditable',
});

export const editorProps = {
    attributes: {
        class: 'prose md:prose-lg lg:prose-xl',
    },
} satisfies EditorProps;

export const extensions = [
    starterKitExtension,
    placeholderExtension,
    fileHandlerExtension,
    captionedImageExtension,
    linkExtension,
    codeBlockLowLightExtension,
] satisfies Extensions;

export const options = {
    editorProps,
    extensions,
    onUpdate({ editor }: { editor: Editor }) {
        console.log(editor.getHTML());
    },
    immediatelyRender: false,
} satisfies UseEditorOptions;
