import os from 'os';
import fs from 'fs';
import path from 'path';
import { stdin as input, stdout as output } from 'process';
import readline from 'readline';
import { getUsername, printCurrentDir, wellcomeUser, exitFileManager } from './helpers/utils.js';
import { errors } from './helpers/constants.js';
import { goUp, changeDir, listFiles } from './fs/navigation.js';

const commandConsole = readline.createInterface({ input, output });

const username = getUsername();

let currentDir = os.homedir();

wellcomeUser(username);
printCurrentDir(currentDir);

commandConsole.on('line', (input) => {
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
    case 'up':
      currentDir = goUp(currentDir);
      printCurrentDir(currentDir);
      break;
    case 'cd':
      if (args.length === 1) {
        currentDir = changeDir(args[0], currentDir);
      } else {
        console.log(errors.invalidInput);
      }
      printCurrentDir(currentDir);
      break;
    case 'ls':
      listFiles(currentDir);
      break;
    case '.exit':
      exitFileManager(username);
      break;
    default:
      console.log(errors.invalidInput);
      printCurrentDir(currentDir);
  }
});

// Ctrl+C
process.on('SIGINT', () => {
  exitFileManager(username);
});
