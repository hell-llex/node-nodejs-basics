import { readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
    const dirPath = join(__dirname, 'files');

    try {
        await stat(dirPath);
        const files = await readdir(dirPath);
        console.log(`----- Files in the directory: -----\n`);
        console.log(files);
        console.log('\n---------------------------------\n');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

await list();