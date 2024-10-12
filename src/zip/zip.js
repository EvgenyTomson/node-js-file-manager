import fs from 'fs/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';
import { errors } from '../helpers/constants.js';
import { clearPath, processPath, getAbsolutePath } from '../helpers/utils.js';

const pipe = promisify(pipeline);

const compressFile = async (currentDir, filePath, destinationPath) => {
  try {
    const fullFilePath = getAbsolutePath(currentDir, filePath);
    await fs.access(fullFilePath);

    const fullDestinationPath = getAbsolutePath(currentDir, destinationPath);

    const inputStream = createReadStream(fullFilePath);
    const outputStream = createWriteStream(fullDestinationPath);
    const brotli = createBrotliCompress();

    await pipe(inputStream, brotli, outputStream);

    console.log(`File ${filePath} was successfully compressed to ${destinationPath}`);
  } catch (_) {
    console.error(errors.operationFailed);
  }
};

const decompressFile = async (currentDir, filePath, destinationPath) => {
  try {
    const fullFilePath = getAbsolutePath(currentDir, filePath);
    await fs.access(fullFilePath);

    const fullDestinationPath = getAbsolutePath(currentDir, destinationPath);

    const inputStream = createReadStream(fullFilePath);
    const outputStream = createWriteStream(fullDestinationPath);
    const brotli = createBrotliDecompress();

    await pipe(inputStream, brotli, outputStream);

    console.log(`File ${filePath} was successfully decompressed to ${destinationPath}`);
  } catch (_) {
    console.error(errors.operationFailed);
  }
};

export const handleCompressCommand = async (currentDir, ...args) => {
  // To handle spaces in filename or path with quotes
  const compressArgs = processPath(args);
  if (compressArgs.length < 2) {
    console.error(errors.invalidInput);
    return;
  }

  const filePath = clearPath(compressArgs[0]);
  const destinationPath = clearPath(compressArgs[1]);

  await compressFile(currentDir, filePath, destinationPath);
};

export const handleDecompressCommand = async (currentDir, ...args) => {
  // To handle spaces in filename or path with quotes
  const decompressArgs = processPath(args);
  if (decompressArgs.length < 2) {
    console.error(errors.invalidInput);
    return;
  }

  const filePath = clearPath(decompressArgs[0]);
  const destinationPath = clearPath(decompressArgs[1]);

  await decompressFile(currentDir, filePath, destinationPath);
};
