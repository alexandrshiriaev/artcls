import { FileHandler as BaseFileHandler } from '@tiptap-pro/extension-file-handler';

import handleFile from '@/lib/image';

const FileHandler = BaseFileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    onDrop: async (currentEditor, files, pos) => {
        files.forEach(file => {
            handleFile(file, currentEditor, pos);
        });
    },
    onPaste: async (currentEditor, files, htmlContent) => {
        files.forEach(file => {
            if (htmlContent) {
                // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                // you could extract the pasted file from this url string and upload it to a server for example
                // console.log(htmlContent); // eslint-disable-line no-console
                return false;
            }

            handleFile(
                file,
                currentEditor,
                currentEditor.state.selection.anchor,
            );
        });
    },
});

export default FileHandler;
