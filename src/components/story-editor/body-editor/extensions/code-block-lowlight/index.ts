import { JetBrains_Mono } from 'next/font/google';

import { CodeBlockLowlight as baseCodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

import '@/components/story-editor/body-editor/extensions/code-block-lowlight/styles.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-code',
});

const lowlight = createLowlight(common);

export const CodeBlockLowlight = baseCodeBlockLowlight.configure({
    lowlight,
});

export default CodeBlockLowlight;
