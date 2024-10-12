import os from 'os';

export const getEOL = () => {
  console.log('\x1b[32m%s\x1b[0m', 'End-Of-Line (EOL) marker:');
  console.log(JSON.stringify(os.EOL));
};

export const getCPUs = () => {
  const cpus = os.cpus();
  console.log('\x1b[32m%s\x1b[0m', `Overall amount of CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: ${cpu.model}, Clock rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
};

export const getHomeDirectory = () => {
  console.log('\x1b[32m%s\x1b[0m', 'Home directory:', os.homedir());
};

export const getSystemUser = () => {
  const userInfo = os.userInfo();
  console.log('\x1b[32m%s\x1b[0m', 'Current system username:', userInfo.username);
};

export const getArchitecture = () => {
  console.log('\x1b[32m%s\x1b[0m', 'CPU architecture:', os.arch());
};
