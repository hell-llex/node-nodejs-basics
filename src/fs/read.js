import { stat, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToRead.txt'); 

    try {
        await stat(pathToFile);
        const data = await readFile(pathToFile, 'utf-8');
        console.log('--------- File info: ---------\n');
        console.log(data);
        console.log('\n----------------------------\n');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

await read();