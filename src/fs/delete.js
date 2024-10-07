import { unlink, stat } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
    const fileToRemove = join(__dirname, 'files', 'fileToRemove.txt'); 

    try {
        await stat(fileToRemove);
        await unlink(fileToRemove);
        console.log('--------- File removed successfully ---------\n');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

await remove();