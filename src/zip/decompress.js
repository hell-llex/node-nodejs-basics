import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
    const sourceFile = join(__dirname, 'files', 'archive.gz');
    const destinationFile = join(__dirname, 'files', 'fileToCompress.txt');

    const readStream = createReadStream(sourceFile);
    const writeStream = createWriteStream(destinationFile);
    const gunzip = createGunzip();
    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on('finish', () => console.log('File decompressed successfully.\n'));
    writeStream.on('error', (err) => console.error('Error during decompression:', err.message));
};

await decompress();