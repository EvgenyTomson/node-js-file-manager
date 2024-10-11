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

export const clearPath = (path) => path.trim().replace(/["']/g, '');

export const processPath = (path) => path.join(' ').match(/(?:[^\s"]+|"[^"]*")+/g);
