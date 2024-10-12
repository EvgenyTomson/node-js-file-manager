import path from 'path';
import { errors } from './constants.js';

export const getUsername = () => {
  const args = process.argv.slice(2);
  const username = args.find((arg) => arg.startsWith('--username=')).split('=')[1];

  if (username === '%npm_config_username%') {
    return 'Anonymous';
  }

  return username;
};

export const printCurrentDir = (currentDir) => {
  console.log(`You are currently in ${currentDir}`);
};

export const wellcomeUser = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

export const exitFileManager = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
};

const clearPath = (path) => path.trim().replace(/["']/g, '');

const processPath = (path) => path.join(' ').match(/(?:[^\s"]+|"[^"]*")+/g);

export const getAbsolutePath = (currentDir, inputPath) =>
  path.isAbsolute(inputPath) ? inputPath : path.join(currentDir, inputPath);

// To handle path with spaces and quotes
export const handlePathWithSpaces = (...args) => {
  const compressArgs = processPath(args);
  let error = null;
  if (compressArgs.length < 2) {
    error = errors.invalidInput;
  }

  const filePath = clearPath(compressArgs[0]);
  const destinationPath = clearPath(compressArgs[1]);

  return { error, filePath, destinationPath };
};
