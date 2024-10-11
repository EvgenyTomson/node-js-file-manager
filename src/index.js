import os from 'os';
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { getUsername, printCurrentDir, wellcomeUser, exitFileManager } from './helpers/utils.js';
import { errors } from './helpers/constants.js';
import { goUp, changeDir, listFiles } from './fs/navigation.js';
import { getEOL, getCPUs, getHomeDirectory, getSystemUser, getArchitecture } from './os/info.js';
import { calculateFileHash } from './hash/hash.js';

const commandConsole = readline.createInterface({ input, output });
const username = getUsername();
let currentDir = os.homedir();

wellcomeUser(username);
printCurrentDir(currentDir);

commandConsole.on('line', (input) => {
  const [command, firstArg, ...args] = input.trim().split(' ');

  switch (command) {
    case 'up':
      currentDir = goUp(currentDir);
      printCurrentDir(currentDir);
      break;
    case 'cd':
      if (!args.length) {
        currentDir = changeDir(firstArg, currentDir);
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
    case 'os':
      if (!args.length) {
        switch (firstArg) {
          case '--EOL':
            getEOL();
            printCurrentDir(currentDir);
            break;
          case '--cpus':
            getCPUs();
            printCurrentDir(currentDir);
            break;
          case '--homedir':
            getHomeDirectory();
            printCurrentDir(currentDir);
            break;
          case '--username':
            getSystemUser();
            printCurrentDir(currentDir);
            break;
          case '--architecture':
            getArchitecture();
            printCurrentDir(currentDir);
            break;
          default:
            console.log(errors.invalidInput);
            printCurrentDir(currentDir);
        }
      } else {
        console.log(errors.invalidInput);
      }
      break;
    case 'hash':
      if (firstArg) {
        // To handle spaces in filename or path
        calculateFileHash([firstArg, ...args].join(' '), currentDir);
      } else {
        console.log(errors.invalidInput);
      }
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
