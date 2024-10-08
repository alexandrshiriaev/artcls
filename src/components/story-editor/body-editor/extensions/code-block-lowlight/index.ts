import { common, createLowlight } from 'lowlight';
import { CodeBlockLowlight as baseCodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import '@/components/story-editor/body-editor/extensions/code-block-lowlight/styles.scss';

import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-code',
});

const lowlight = createLowlight(common);

export const CodeBlockLowlight = baseCodeBlockLowlight.configure({
    lowlight,
});

export default CodeBlockLowlight;
