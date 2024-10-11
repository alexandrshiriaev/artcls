import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';

import type { Editor } from '@tiptap/core'; // @ts-ignore
import type { Extensions } from '@tiptap/core/src/types';
import type { EditorProps } from '@tiptap/pm/view'; // @ts-ignore
import type { UseEditorOptions } from '@tiptap/react/src/useEditor';

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
    onUpdate({ editor }: { editor: Editor }) {
        window.localStorage.setItem('title-content', editor.getHTML());
    },
    immediatelyRender: false,
} satisfies UseEditorOptions;
