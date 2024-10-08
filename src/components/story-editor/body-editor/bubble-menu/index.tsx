'use client';
import { Editor } from '@tiptap/core';

import { BubbleMenu, useCurrentEditor } from '@tiptap/react';
import { Button, ButtonProps } from '@/components/ui/button';
import { LuBold, LuItalic, LuLink, LuQuote } from 'react-icons/lu';
import { cn } from '@/lib/utils';

interface BubbleMenuUIProps {
    editor: Editor | null;
}

export default function BubbleMenuUI(props: BubbleMenuUIProps) {
    let { editor } = useCurrentEditor();

    if (!editor) editor = props.editor;

    if (!editor) return;

    return (
        <BubbleMenu editor={editor}>
            <BubbleMenuButtonsGroup>
                {editor?.isActive('captionedImage') ? (
                    <>
                        <BubbleMenuButton
                            onClick={() => {
                                const caption = prompt(
                                    'Введите новую подпись к изображению: ',
                                );
                                if (caption) {
                                    editor
                                        ?.chain()
                                        .updateAttributes('captionedImage', {
                                            caption,
                                        })
                                        .run();
                                }
                            }}
                        >
                            Подпись
                        </BubbleMenuButton>
                    </>
                ) : (
                    <>
                        <BubbleMenuButton
                            onClick={() =>
                                editor?.chain().focus().toggleBold().run()
                            }
                            className={cn({
                                'text-emerald-400': editor.isActive('bold'),
                            })}
                        >
                            <LuBold className="w-5 h-5" />
                        </BubbleMenuButton>
                        <BubbleMenuButton
                            onClick={() =>
                                editor?.chain().focus().toggleItalic().run()
                            }
                            className={cn({
                                'text-emerald-400': editor.isActive('italic'),
                            })}
                        >
                            <LuItalic className="w-5 h-5" />
                        </BubbleMenuButton>
                        <BubbleMenuButton
                            onClick={() => {
                                const previousUrl =
                                    editor?.getAttributes('link').href;
                                let url = prompt('Введите URL: ', previousUrl);

                                if (url === null) {
                                    return;
                                }

                                if (url === '') {
                                    editor
                                        ?.chain()
                                        .focus()
                                        .extendMarkRange('link')
                                        .unsetLink()
                                        .run();
                                    return;
                                }

                                if (
                                    !url.startsWith('https://') ||
                                    !url.startsWith('http://')
                                ) {
                                    url = 'https://' + url;
                                }

                                editor
                                    ?.chain()
                                    .focus()
                                    .extendMarkRange('link')
                                    .setLink({ href: url })
                                    .run();
                            }}
                            className={cn({
                                'text-emerald-400': editor.isActive('link'),
                            })}
                        >
                            <LuLink className="w-5 h-5" />
                        </BubbleMenuButton>
                        <BubbleMenuSeparator />
                        <BubbleMenuButton
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                            }
                            className={cn('px-1', {
                                'text-emerald-400': editor.isActive('heading', {
                                    level: 3,
                                }),
                            })}
                        >
                            <span className="text-xl">T</span>
                        </BubbleMenuButton>
                        <BubbleMenuButton
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleHeading({ level: 4 })
                                    .run()
                            }
                            className={cn('px-1', {
                                'text-emerald-400': editor.isActive('heading', {
                                    level: 4,
                                }),
                            })}
                        >
                            <span className="text-lg">T</span>
                        </BubbleMenuButton>
                        <BubbleMenuButton
                            onClick={() =>
                                editor?.chain().focus().toggleBlockquote().run()
                            }
                            className={cn({
                                'text-emerald-400':
                                    editor.isActive('blockquote'),
                            })}
                        >
                            <LuQuote className="w-5 h-5" />
                        </BubbleMenuButton>
                    </>
                )}
            </BubbleMenuButtonsGroup>
        </BubbleMenu>
    );
}

type BubbleMenuButtonProps = ButtonProps;

function BubbleMenuButton({
    children,
    className,
    ...props
}: BubbleMenuButtonProps) {
    return (
        <Button className={cn('p-0 duration-75', className)} {...props}>
            {children}
        </Button>
    );
}

interface BubbleMenuButtonsGroupProps {
    children: React.ReactNode | React.ReactNode[];
}

function BubbleMenuButtonsGroup({ children }: BubbleMenuButtonsGroupProps) {
    return (
        <div className="bg-slate-900 rounded-xl py-1 px-4 flex gap-x-2 items-end">
            {children}
        </div>
    );
}

function BubbleMenuSeparator() {
    return (
        <div className="bg-slate-500 w-[1px] rounded-full my-1 mx-2 self-stretch" />
    );
}
