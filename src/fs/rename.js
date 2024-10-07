import { stat, rename as renameFs } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
    const oldFileName = join(__dirname, 'files', 'wrongFilename.txt');
    const newFileName = join(__dirname, 'files', 'properFilename.md');

    try {
        await stat(oldFileName);
    } catch (error) {
        throw new Error('FS operation failed');
    }

    try {
        await stat(newFileName);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await renameFs(oldFileName, newFileName);
            console.log('--------- File renamed successfully ---------\n');
        } else {
            throw error;
        }
    }
};

await rename();