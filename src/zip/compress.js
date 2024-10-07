import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
const __dirname = dirname(fileURLToPath(import.meta.url));

const compress = async () => {
    const sourceFile = join(__dirname, 'files', 'fileToCompress.txt');
    const destinationFile = join(__dirname, 'files', 'archive.gz');

    const readStream = createReadStream(sourceFile);
    const writeStream = createWriteStream(destinationFile);
    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);
    writeStream.on('finish', () => console.log('File compressed successfully.\n'));
    writeStream.on('error', (err) => console.error('Error during compression:', err.message));
};

await compress();