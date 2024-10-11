import Link from 'next/link';

import { NodeViewWrapper } from '@tiptap/react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { publicRoutes } from '@/routes';

import type { NodeViewProps } from '@tiptap/react';

export default function MentionNode({ editor, node }: NodeViewProps) {
    return (
        <NodeViewWrapper as={'span'} className={'text-emerald-500'}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {editor.isEditable ? (
                            <span className="no-underline font-normal text-emerald-500">
                                {node.attrs.label || node.attrs.id}
                            </span>
                        ) : (
                            <Link
                                href={`${publicRoutes.PROFILE}/@${node.attrs.id}`}
                                className="no-underline font-normal text-emerald-500"
                            >
                                {node.attrs.label || node.attrs.id}
                            </Link>
                        )}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>TODO: add here user info</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </NodeViewWrapper>
    );
}
