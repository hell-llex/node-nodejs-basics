import { mkdir, readdir, stat, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copyDirectory = async (sourceDir, targetDir) => {
    await mkdir(targetDir, { recursive: true });
    const files = await readdir(sourceDir);
    for (const file of files) {
        const srcPath = join(sourceDir, file);
        const destPath = join(targetDir, file);
        const directory = await stat(srcPath);
        if (directory.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            await copyFile(srcPath, destPath);
        }
    }
};

const copy = async () => {
    const sourceDir = join(__dirname, 'files');
    const targetDir = join(__dirname, 'files_copy');

    try {
        await stat(sourceDir);
    } catch (error) {
        throw new Error('FS operation failed');
    }

    try {
        await stat(targetDir);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await copyDirectory(sourceDir, targetDir);
            console.log('--------- Directory copied successfully ---------\n');
        } else {
            throw error;
        }
    }
};

await copy();