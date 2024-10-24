import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';

import CaptionedImage from '@/components/story-editor/body-editor/extensions/captioned-image';
import CodeBlockLowlight from '@/components/story-editor/body-editor/extensions/code-block-lowlight';
import FileHandler from '@/components/story-editor/body-editor/extensions/file-handler';
import Mention from '@/components/story-editor/body-editor/extensions/mention';

import type { Editor } from '@tiptap/core';
// @ts-ignore
import type { Extensions } from '@tiptap/core/src/types';
import type { EditorProps } from '@tiptap/pm/view';
// @ts-ignore
import type { UseEditorOptions } from '@tiptap/react/src/useEditor';

const starterKitExtension = StarterKit.configure({
    heading: {
        levels: [3, 4],
    },
    codeBlock: false,
    horizontalRule: {
        HTMLAttributes: {
            class: 'block border-0 text-center overflow-visible before:content-["..."] before:inline-block before:text-gray-900 before:ml-2 before:relative before:top-[-30px] before:tracking-[1.6rem] before:font-bold',
        },
    },
});

const placeholderExtension = Placeholder.configure({
    placeholder: ({ node }) => {
        if (node.type.name === 'paragraph') {
            return 'Напишите содержание статьи...';
        }

        if (node.type.name === 'captionedImage')
            return 'Напишите подпись к изображению...';

        return '';
    },
});

const linkExtension = Link.configure({
    defaultProtocol: 'https',
    autolink: true,
    openOnClick: 'whenNotEditable',
});

const captionedImageExtension = CaptionedImage;

const fileHandlerExtension = FileHandler;

const codeBlockLowLightExtension = CodeBlockLowlight;

const mentionExtension = Mention;

export const editorProps = {
    attributes: {
        class: 'prose prose-lg lg:prose-xl',
    },
} satisfies EditorProps;

export const extensions = [
    starterKitExtension,
    placeholderExtension,
    fileHandlerExtension,
    captionedImageExtension,
    linkExtension,
    codeBlockLowLightExtension,
    mentionExtension,
] satisfies Extensions;

export const options = {
    editorProps,
    extensions,
    onUpdate({ editor }: { editor: Editor }) {
        window.localStorage.setItem('body-content', editor.getHTML());
    },
    immediatelyRender: false,
} satisfies UseEditorOptions;
