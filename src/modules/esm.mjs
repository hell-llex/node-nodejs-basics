import { readFile } from "fs/promises";
import { sep, dirname, join } from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import './files/c.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const aJson = join(__dirname, 'files', 'a.json');
const bJson = join(__dirname, 'files', 'b.json');
const random = Math.random();
let unknownObject;

const loadJSON = async (filePath) => {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
};

unknownObject = await loadJSON(random > 0.5 ? aJson : bJson);;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };