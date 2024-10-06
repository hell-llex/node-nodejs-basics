import { stat, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const content = 'I am fresh and young';

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');

    try {
        await stat(filePath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeFile(filePath, content);
            console.log('--------- File created successfully ---------\n');
        } else {
            throw error;
        }
    }
};

await create();