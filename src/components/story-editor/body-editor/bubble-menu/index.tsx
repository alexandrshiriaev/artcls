'use client';

import { BubbleMenu, useCurrentEditor } from '@tiptap/react';

import InsertParagraphNearlyButton from '@/components/story-editor/body-editor/bubble-menu/buttons/insert-paragraph-nearly-button';
import SetImageCaptionButton from '@/components/story-editor/body-editor/bubble-menu/buttons/set-image-caption-button';
import SetLinkButton from '@/components/story-editor/body-editor/bubble-menu/buttons/set-link-button';
import ToggleBoldButton from '@/components/story-editor/body-editor/bubble-menu/buttons/toggle-bold-button';
import ToggleHeadingButton from '@/components/story-editor/body-editor/bubble-menu/buttons/toggle-heading-button';
import ToggleItalicButton from '@/components/story-editor/body-editor/bubble-menu/buttons/toggle-italic-button';
import ToggleQuotesButton from '@/components/story-editor/body-editor/bubble-menu/buttons/toggle-quotes-button';
import ToggleSubheadingButton from '@/components/story-editor/body-editor/bubble-menu/buttons/toggle-subheading-button';

import type { Editor } from '@tiptap/core';

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
                        <SetImageCaptionButton />
                        <InsertParagraphNearlyButton />
                    </>
                ) : (
                    <>
                        <ToggleBoldButton />
                        <ToggleItalicButton />
                        <SetLinkButton />
                        <BubbleMenuSeparator />
                        <ToggleHeadingButton />
                        <ToggleSubheadingButton />
                        <ToggleQuotesButton />
                    </>
                )}
            </BubbleMenuButtonsGroup>
        </BubbleMenu>
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
