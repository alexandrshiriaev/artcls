import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import CharacterCount from '@tiptap/extension-character-count';
// @ts-ignore
import { UseEditorOptions } from '@tiptap/react/src/useEditor';
// @ts-ignore
import { Extensions } from '@tiptap/core/src/types';
import { EditorProps } from '@tiptap/pm/view';

const extensions = [
    Document.extend({
        content: 'heading',
    }),
    Heading.configure({
        levels: [2],
    }),
    Placeholder.configure({
        placeholder: 'Напишите заголовок статьи...',
    }),
    Text,
    CharacterCount.configure({
        limit: 100,
        mode: 'nodeSize',
    }),
] satisfies Extensions;

const editorProps = {
    attributes: {
        class: 'prose md:prose-lg lg:prose-xl',
    },
} satisfies EditorProps;

export const options = {
    extensions,
    editorProps,
    immediatelyRender: false,
} satisfies UseEditorOptions;
