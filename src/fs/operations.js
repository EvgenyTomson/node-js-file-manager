import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { errors } from '../helpers/constants.js';
import { getAbsolutePath, handlePathWithSpaces } from '../helpers/utils.js';

export const cat = async (filePath, currentDir) => {
  const absolutePath = getAbsolutePath(currentDir, filePath);

  try {
    const readableStream = createReadStream(absolutePath, { encoding: 'utf-8' });
    readableStream.on('data', (chunk) => process.stdout.write(chunk));
    readableStream.on('error', () => console.error('Operation failed'));
  } catch (error) {
    console.error(errors.operationFailed);
  }
};

export const add = async (fileName, currentDir) => {
  const absolutePath = getAbsolutePath(currentDir, fileName);

  try {
    fs.writeFileSync(absolutePath, '', { flag: 'wx' });
    console.log('\x1b[32m%s\x1b[0m', `File '${fileName}' created successfully.`);
  } catch (error) {
    console.error(errors.operationFailed);
  }
};

export const remove = async (filePath, currentDir) => {
  const absolutePath = getAbsolutePath(currentDir, filePath);

  try {
    fs.unlinkSync(absolutePath);
    console.log('\x1b[32m%s\x1b[0m', `File '${filePath}' deleted successfully.`);
  } catch (error) {
    console.error(errors.operationFailed);
  }
};

const rename = async (currentDir, oldFilePath, newFileName) => {
  const oldAbsolutePath = getAbsolutePath(currentDir, oldFilePath);
  const newAbsolutePath = getAbsolutePath(currentDir, newFileName);

  try {
    fs.renameSync(oldAbsolutePath, newAbsolutePath);
    console.log('\x1b[32m%s\x1b[0m', `File renamed successfully to '${newFileName}'.`);
  } catch (error) {
    console.error(errors.operationFailed);
  }
};

const copy = async (currentDir, filePath, newDirectory) => {
  const sourceFile = getAbsolutePath(currentDir, filePath);
  const destinationFile = getAbsolutePath(
    currentDir,
    path.join(newDirectory, path.basename(filePath))
  );

  try {
    await pipeline(createReadStream(sourceFile), createWriteStream(destinationFile));
    console.log('\x1b[32m%s\x1b[0m', `File copied to '${destinationFile}'.`);
  } catch (error) {
    console.error(errors.operationFailed);
  }
};

const move = async (currentDir, filePath, newDirectory) => {
  const sourceFile = getAbsolutePath(currentDir, filePath);
  const destinationFile = getAbsolutePath(
    currentDir,
    path.join(newDirectory, path.basename(filePath))
  );

  try {
    await pipeline(createReadStream(sourceFile), createWriteStream(destinationFile));
    fs.unlinkSync(sourceFile);
    console.log('\x1b[32m%s\x1b[0m', `File moved to '${destinationFile}'.`);
  } catch (error) {
    console.error(errors.operationFailed);
  }
};

export const handleRenameCommand = async (currentDir, ...args) => {
  const { error, filePath, destinationPath } = handlePathWithSpaces(...args);

  if (error) {
    console.error(error);
    return;
  }

  await rename(currentDir, filePath, destinationPath);
};

export const handleCopyCommand = async (currentDir, ...args) => {
  const { error, filePath, destinationPath } = handlePathWithSpaces(...args);

  if (error) {
    console.error(error);
    return;
  }

  await copy(currentDir, filePath, destinationPath);
};

export const handleMoveCommand = async (currentDir, ...args) => {
  const { error, filePath, destinationPath } = handlePathWithSpaces(...args);

  if (error) {
    console.error(error);
    return;
  }

  await move(currentDir, filePath, destinationPath);
};
