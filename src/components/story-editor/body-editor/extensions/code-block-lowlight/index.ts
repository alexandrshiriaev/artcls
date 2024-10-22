import { CodeBlockLowlight as baseCodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

import '@/components/story-editor/body-editor/extensions/code-block-lowlight/styles.scss';

import { Selection } from '@tiptap/pm/state';

const lowlight = createLowlight(common);

export const CodeBlockLowlight = baseCodeBlockLowlight
    .configure({
        lowlight,
    })
    .extend({
        addKeyboardShortcuts() {
            return {
                'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),

                // remove code block when at start of document or code block is empty
                Backspace: () => {
                    const { empty, $anchor } = this.editor.state.selection;
                    const isAtStart = $anchor.pos === 1;

                    if (!empty || $anchor.parent.type.name !== this.name) {
                        return false;
                    }

                    if (isAtStart || !$anchor.parent.textContent.length) {
                        return this.editor.commands.clearNodes();
                    }

                    return false;
                },

                // exit node on triple enter
                Enter: ({ editor }) => {
                    if (!this.options.exitOnTripleEnter) {
                        return false;
                    }

                    const { state } = editor;
                    const { selection } = state;
                    const { $from, empty } = selection;

                    if (!empty || $from.parent.type !== this.type) {
                        return false;
                    }

                    const isAtEnd =
                        $from.parentOffset === $from.parent.nodeSize - 2;

                    const endsWithDoubleNewline =
                        $from.parent.textContent.endsWith('\n\n');

                    const startsWithDoubleNewline =
                        $from.parent.textContent.startsWith('\n\n');
                    const isAtStart = $from.parentOffset <= 2;

                    if (isAtEnd && endsWithDoubleNewline) {
                        return editor
                            .chain()
                            .command(({ tr }) => {
                                tr.delete($from.pos - 2, $from.pos);

                                return true;
                            })
                            .exitCode()
                            .run();
                    } else if (isAtStart && startsWithDoubleNewline) {
                        return editor
                            .chain()
                            .command(({ tr }) => {
                                tr.delete(
                                    $from.pos - $from.parentOffset,
                                    $from.pos - $from.parentOffset + 2,
                                );
                                return true;
                            })
                            .insertContentAt(
                                $from.pos - $from.parentOffset - 1,
                                {
                                    type: 'paragraph',
                                },
                            )
                            .run();
                    } else {
                        return false;
                    }
                },

                // exit node on arrow down
                ArrowDown: ({ editor }) => {
                    if (!this.options.exitOnArrowDown) {
                        return false;
                    }

                    const { state } = editor;
                    const { selection, doc } = state;
                    const { $from, empty } = selection;

                    if (!empty || $from.parent.type !== this.type) {
                        return false;
                    }

                    const isAtEnd =
                        $from.parentOffset === $from.parent.nodeSize - 2;

                    if (!isAtEnd) {
                        return false;
                    }

                    const after = $from.after();

                    if (after === undefined) {
                        return false;
                    }

                    const nodeAfter = doc.nodeAt(after);

                    if (nodeAfter) {
                        return editor.commands.command(({ tr }) => {
                            tr.setSelection(Selection.near(doc.resolve(after)));
                            return true;
                        });
                    }

                    return editor.commands.exitCode();
                },
            };
        },
    });

export default CodeBlockLowlight;
