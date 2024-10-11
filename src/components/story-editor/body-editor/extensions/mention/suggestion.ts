import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import { debounce } from 'ts-debounce';

import { findUsersByQuery } from '@/actions/users/find-users-by-query';
import MentionList from '@/components/story-editor/body-editor/extensions/mention/mention-list';

import type { MentionItem } from '@/components/story-editor/body-editor/extensions/mention/index';
import type { Editor } from '@tiptap/core';
import type { MentionNodeAttrs } from '@tiptap/extension-mention';
import type { SuggestionOptions } from '@tiptap/suggestion';
import type { GetReferenceClientRect, Instance } from 'tippy.js';

const debouncedFindUsers = debounce(findUsersByQuery, 300);

export default {
    async items({ query }): Promise<MentionItem[]> {
        return debouncedFindUsers(query);
    },
    command: ({ editor, range, props }) => {
        // increase range.to by one when the next node is of type "text"
        // and starts with a space character
        const nodeAfter = editor.view.state.selection.$to.nodeAfter;
        const overrideSpace = nodeAfter?.text?.startsWith(' ');
        if (overrideSpace) {
            range.to += 1;
        }

        editor
            .chain()
            .focus()
            .insertContentAt(range, [
                {
                    type: 'mention',
                    attrs: props,
                },
                {
                    type: 'text',
                    text: ' ',
                },
            ])
            .run();

        // get reference to `window` object from editor element, to support cross-frame JS usage
        editor.view.dom.ownerDocument.defaultView
            ?.getSelection()
            ?.collapseToEnd();
    },
    render() {
        let reactRenderer: ReactRenderer;
        let popup: Instance[];

        return {
            onStart(props) {
                reactRenderer = new ReactRenderer(MentionList, {
                    props: { ...props },
                    editor: props.editor as Editor,
                });

                popup = tippy('body', {
                    getReferenceClientRect:
                        props.clientRect as GetReferenceClientRect,
                    appendTo: () => document.body,
                    content: reactRenderer.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                    theme: 'light-border',
                    arrow: false,
                    maxWidth: 600,
                });
            },
            onKeyDown(props) {
                if (props.event.key === 'Escape') {
                    popup[0].hide();

                    return true;
                }

                // @ts-ignore
                return reactRenderer?.ref?.onKeyDown?.(props);
            },
            onUpdate(props) {
                reactRenderer.updateProps(props);
            },
            onExit() {
                popup[0].destroy();
                reactRenderer?.destroy();
            },
        };
    },
} satisfies
    | Omit<SuggestionOptions<unknown, MentionNodeAttrs>, 'editor'>
    | undefined;
