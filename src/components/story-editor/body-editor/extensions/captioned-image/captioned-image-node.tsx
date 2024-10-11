import { NodeViewWrapper, useCurrentEditor } from '@tiptap/react';
import { useEffect, useTransition } from 'react';

import { ImageZoom } from '@/components/story-editor/body-editor/extensions/captioned-image/image-zoom';

import type { NodeViewProps } from '@tiptap/react';

export default function CaptionedImageNode({
    node,
    updateAttributes,
}: NodeViewProps) {
    const { src, alt, caption, uploadImageHandler } = node.attrs;
    const [isUploading, startTransition] = useTransition();

    const { editor } = useCurrentEditor();

    useEffect(() => {
        if (src?.startsWith('data') && !isUploading) {
            startTransition(async () => {
                const res = await uploadImageHandler();
                if (res.success) {
                    updateAttributes({
                        src: res.success,
                        uploadImageHandler: undefined,
                    });
                }
            });
        }
    }, [isUploading, src]);

    return (
        <NodeViewWrapper className="captioned-image relative" as="figure">
            {isUploading && (
                <div className="absolute top-5 left-0 text-muted-foreground text-sm">
                    Загрузка...
                </div>
            )}

            {!editor?.isEditable ? (
                <ImageZoom src={src} alt={alt} />
            ) : (
                <img src={src} alt={alt} />
            )}

            {caption && (
                <figcaption contentEditable={false}>{caption}</figcaption>
            )}
        </NodeViewWrapper>
    );
}
