import { Mention as baseMention } from '@tiptap/extension-mention';
import { ReactNodeViewRenderer } from '@tiptap/react';

import MentionNode from '@/components/story-editor/body-editor/extensions/mention/mention-node';
import suggestion from '@/components/story-editor/body-editor/extensions/mention/suggestion';

export type MentionItem = {
    id: string;
    name: string;
    username: string;
    image: string | null;
};

const Mention = baseMention
    .configure({
        HTMLAttributes: {
            class: 'mention',
        },
        renderHTML({ node }) {
            return node.attrs.label;
        },
        suggestion,
    })
    .extend({
        addNodeView() {
            return ReactNodeViewRenderer(MentionNode);
        },
    });

export default Mention;
