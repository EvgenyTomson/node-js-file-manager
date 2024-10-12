import fs from 'fs';
import path from 'path';
import { errors } from '../helpers/constants.js';
import { getAbsolutePath } from '../helpers/utils.js';

export const goUp = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  if (currentDir !== parentDir) {
    return parentDir;
  }
  return currentDir;
};

export const changeDir = (dir, currentDir) => {
  const targetDir = getAbsolutePath(currentDir, dir);
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
      if (file.isDirectory()) {
        directoriesList.push(file.name);
      } else {
        filesList.push(file.name);
      }
    });

    const sorteDirectories = directoriesList
      .sort()
      .map((item) => ({ name: item, type: 'directory' }));
    const sortedFiles = filesList
      .sort()
      .sort()
      .map((item) => ({ name: item, type: 'file' }));

    if (sorteDirectories.length || sortedFiles.length) {
      console.table([...sorteDirectories, ...sortedFiles]);
      return;
    }

    console.log('Directory is empty');
  });
};
