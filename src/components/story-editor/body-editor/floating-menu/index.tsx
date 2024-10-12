'use client';

import { FloatingMenu, useCurrentEditor } from '@tiptap/react';
import { useRef, useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

import { Button } from '@/components/ui/button';
import handleFile from '@/lib/image';

import type { Editor } from '@tiptap/core';

interface FloatingMenuUIProps {
    editor: Editor | null;
}

export default function FloatingMenuUI(props: FloatingMenuUIProps) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(prev => !prev);
    }

    let { editor } = useCurrentEditor();

    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!editor) editor = props.editor;

    if (!editor) return;

    function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target?.files?.[0];
        if (!file || !editor) return;
        handleFile(file, editor, editor.state.selection.anchor);
    }

    return (
        <FloatingMenu
            editor={editor}
            tippyOptions={{
                onAfterUpdate() {
                    setIsOpen(false);
                },
            }}
            shouldShow={({ editor, state }) =>
                editor.isActive('paragraph') &&
                !state.selection.$anchor.node().content.size
            }
        >
            <div className="flex gap-x-4 relative left-0 lg:left-[-56px]">
                <Button onClick={toggleMenu} variant="ghost" size="icon">
                    <HiOutlinePlusCircle className="w-10 h-10 stroke-[0.5px]" />
                </Button>
                {isOpen && (
                    <div className="flex gap-x-2">
                        <Button
                            onClick={() =>
                                editor?.chain().toggleCodeBlock().run()
                            }
                        >
                            Блок кода
                        </Button>
                        <input
                            type="file"
                            multiple={false}
                            onChange={onFileChange}
                            ref={fileInputRef}
                            accept="image/png',image/jpeg,image/webp"
                            hidden
                        />
                        <Button onClick={() => fileInputRef.current?.click()}>
                            Изображение
                        </Button>
                        <Button
                            onClick={() =>
                                editor?.chain().setHorizontalRule().run()
                            }
                        >
                            Новая часть
                        </Button>
                    </div>
                )}
            </div>
        </FloatingMenu>
    );
}
