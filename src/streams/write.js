import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    try {
        console.log('Enter text and press Ctrl + D (or Ctrl + Z on Windows) to finish.\n');
        const writeStream = createWriteStream(filePath, { flags: 'w' });
        process.stdin.pipe(writeStream);
        writeStream.on('finish', () => console.log('\nWriting completed.\n'));
        writeStream.on('error', (error) => console.error('Error while writing to file:', error.message));
    } catch (error) {
        console.error('Error:', error.message);
    }
};

await write();