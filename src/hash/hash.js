import path from 'path';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { errors } from '../helpers/constants.js';
import { getAbsolutePath } from '../helpers/utils.js';

export const calculateFileHash = async (filePath, currentDir) => {
  try {
    const absolutePath = getAbsolutePath(currentDir, filePath);
    const hash = createHash('sha256');
    const stream = createReadStream(absolutePath);

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      console.log(`Hash for file ${path.basename(absolutePath)}: ${hash.digest('hex')}`);
    });

    stream.on('error', (_) => {
      console.error(errors.operationFailed);
    });
  } catch (_) {
    console.error(errors.invalidInput);
  }
};
