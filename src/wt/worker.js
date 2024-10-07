import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (result) => {
    if (parentPort) parentPort.postMessage({ status: 'resolved', data: result });
};

if (parentPort) parentPort.on('message', (n) => {
    try {
        const result = nthFibonacci(n);
        sendResult(result);
    } catch (error) {
        sendResult(null);
    }
});
