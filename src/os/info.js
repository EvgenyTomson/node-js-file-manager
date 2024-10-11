import os from 'os';

export const getEOL = () => {
  console.log('End-Of-Line (EOL) marker:');
  console.log(JSON.stringify(os.EOL));
};

export const getCPUs = () => {
  const cpus = os.cpus();
  console.log(`Overall amount of CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: ${cpu.model}, Clock rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
};

export const getHomeDirectory = () => {
  console.log('Home directory:', os.homedir());
};

export const getSystemUser = () => {
  const userInfo = os.userInfo();
  console.log('Current system username:', userInfo.username);
};

export const getArchitecture = () => {
  console.log('CPU architecture:', os.arch());
};
