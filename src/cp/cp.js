import { spawn } from 'child_process';
import { stdin, stdout } from 'process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
    const child = spawn('node', [join(__dirname, 'files', 'script.js'), ...args]);

    stdin.on('data', (data) => child.stdin.write(data));

    child.stdout.on('data', (data) => stdout.write(data));

    child.stderr.on('data', (data) => console.error(`Error from child process: ${data}`));

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        process.exit(code);
    });
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);