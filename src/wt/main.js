import { Worker } from 'worker_threads';
import os from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
    const numCPUs = os.cpus().length;
    const results = [];

    const createWorker = (n) => {
        return new Promise((resolve) => {
            const worker = new Worker(join(__dirname, 'worker.js'));
            worker.postMessage(n);
            worker.on('message', (message) => resolve(message));
            worker.on('error', () => resolve({ status: 'error', data: null }));
            worker.on('exit', (code) => {
                if (code !== 0) resolve({ status: 'error', data: null })
            });
        });
    };

    for (let i = 0; i < numCPUs; i++) {
        const result = await createWorker(10 + i);
        results.push(result);
    }

    console.log(results);
    console.log("\nProcessing complete. Terminating process...\n");
    process.exit(0);
};

await performCalculations();