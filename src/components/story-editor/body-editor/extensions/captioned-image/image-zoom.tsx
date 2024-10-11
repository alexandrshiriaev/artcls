'use client';

import mediumZoom from 'medium-zoom';
import { useRef } from 'react';

import type { Zoom, ZoomOptions } from 'medium-zoom';
import type { ComponentProps, RefCallback } from 'react';

type ImageZoomProps = ComponentProps<'img'> & {
    options?: ZoomOptions;
};

export function ImageZoom({ options, ...props }: ImageZoomProps) {
    const zoomRef = useRef<Zoom | null>(null);

    function getZoom() {
        if (zoomRef.current === null) {
            zoomRef.current = mediumZoom(options);
        }

        return zoomRef.current;
    }

    const attachZoom: RefCallback<HTMLImageElement> = node => {
        const zoom = getZoom();

        if (node) {
            zoom.attach(node);
        } else {
            zoom.detach();
        }
    };

    return <img {...props} ref={attachZoom} />;
}
