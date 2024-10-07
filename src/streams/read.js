import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    try {
        const stream = createReadStream(filePath, 'utf-8');
        stream.pipe(process.stdout);
        stream.on('end', () => console.log('\n'));
        stream.on('error', (err) => console.error('Error while reading the file:', err));
    } catch (error) {
        console.error('Error:', error.message);
    }
};

await read();