import { Transform } from 'stream';

const transform = async () => {
    console.log('Enter text and press Ctrl + D (or Ctrl + Z on Windows) to finish.\n');
    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk.toString().split('').reverse().join('') + '\n\n';
            callback(null, reversed);
        }
    });
    process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();