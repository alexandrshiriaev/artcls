import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import CaptionedImageNode from '@/components/story-editor/body-editor/extensions/captioned-image/captioned-image-node';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        captionedImage: {
            setCaptionedImage: (options: {
                src: string;
                alt?: string;
                title?: string;
                caption?: string;
            }) => ReturnType;
        };
    }
}

const CaptionedImage = Node.create({
    name: 'captionedImage',

    group: 'block',

    content: 'inline*',

    draggable: true,

    selectable: true,

    atom: true,

    isolating: true,

    addAttributes() {
        return {
            src: {
                default: null,
                parseHTML: element =>
                    element.querySelector('img')?.getAttribute('src'),
            },
            alt: {
                default: null,
                parseHTML: element =>
                    element.querySelector('img')?.getAttribute('alt'),
            },
            title: {
                default: null,
                parseHTML: element =>
                    element.querySelector('img')?.getAttribute('title'),
            },
            caption: {
                default: '',
                parseHTML: element =>
                    element.querySelector('figcaption')?.textContent,
            },
            uploadImageHandler: undefined,
        };
    },

    addCommands() {
        return {
            setCaptionedImage:
                options =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: options,
                    });
                },
        };
    },

    parseHTML() {
        return [{ tag: 'figure' }];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'figure',
            [
                'img',
                mergeAttributes({
                    ...HTMLAttributes,
                    uploadImageHandler: undefined,
                }),
            ],
            ['figcaption', HTMLAttributes.caption],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(CaptionedImageNode, {
            stopEvent() {
                return false;
            },
            className: 'w-full flex justify-center',
        });
    },
});

export default CaptionedImage;
