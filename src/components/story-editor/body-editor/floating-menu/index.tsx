'use client';

import { FloatingMenu, useCurrentEditor } from '@tiptap/react';
import { useState } from 'react';

import InsertCodeBlockButton from '@/components/story-editor/body-editor/floating-menu/buttons/insert-codeblock-button';
import InsertHrButton from '@/components/story-editor/body-editor/floating-menu/buttons/insert-hr-button';
import InsertImageButton from '@/components/story-editor/body-editor/floating-menu/buttons/insert-image-button';
import TriggerButton from '@/components/story-editor/body-editor/floating-menu/buttons/trigger-button';

import type { Editor } from '@tiptap/core';

interface FloatingMenuUIProps {
    editor: Editor | null;
}

export default function FloatingMenuUI(props: FloatingMenuUIProps) {
    let { editor } = useCurrentEditor();

    if (!editor) editor = props.editor;

    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(prev => !prev);
    }

    if (!editor) return;

    return (
        <FloatingMenu
            editor={editor}
            tippyOptions={{
                onAfterUpdate() {
                    setIsOpen(false);
                },
                onShow() {
                    if (window !== undefined) {
                        const element = document.querySelector(
                            '.tiptap p.is-editor-empty:first-child',
                        );
                        if (element) {
                            element.classList.add('placeholder-hidden');
                        }
                        console.log(element);
                    }
                },
                onHide() {
                    if (window !== undefined) {
                        const element = document.querySelector(
                            '.tiptap p.is-editor-empty:first-child',
                        );
                        if (element) {
                            element.classList.remove('placeholder-hidden');
                        }
                    }
                },
            }}
            shouldShow={({ editor, state }) =>
                editor.isActive('paragraph') &&
                !state.selection.$anchor.node().content.size
            }
        >
            <div className="flex gap-x-4 relative left-0 lg:left-[-74px] outline-none">
                <TriggerButton onClick={toggleMenu} open={isOpen} />
                {isOpen && (
                    <div className="flex gap-x-2">
                        <InsertCodeBlockButton />
                        <InsertImageButton />
                        <InsertHrButton />
                    </div>
                )}
            </div>
        </FloatingMenu>
    );
}
