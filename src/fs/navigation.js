import fs from 'fs';
import path from 'path';
import { errors } from '../helpers/constants.js';

export const goUp = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  if (currentDir !== parentDir) {
    return parentDir;
  }
  return currentDir;
};

export const changeDir = (dir, currentDir) => {
  const targetDir = path.isAbsolute(dir) ? dir : path.join(currentDir, dir);
  if (fs.existsSync(targetDir) && fs.statSync(targetDir).isDirectory()) {
    return targetDir;
  } else {
    console.error(errors.operationFailed);
    return currentDir;
  }
};

export const listFiles = (currentDir) => {
  fs.readdir(currentDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(errors.operationFailed);
      return;
    }

    const directoriesList = [];
    const filesList = [];

    files.forEach((file) => {
      const type = file.isDirectory() ? 'directory' : 'file';
      if (file.isDirectory()) {
        directoriesList.push(`${file.name} - ${type}`);
      } else {
        filesList.push(`${file.name} - ${type}`);
      }
    });

    directoriesList.sort();
    filesList.sort();

    const output =
      directoriesList.length || filesList.length
        ? [...directoriesList, ...filesList].join('\n')
        : 'Directory is empty';

    console.log(output);
  });
};
