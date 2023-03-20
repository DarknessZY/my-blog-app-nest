import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';
import { Logger } from '@nestjs/common';

function parseEnv() {
  const localEnv = path.resolve('.env');
  const devEnv = path.resolve('.env.dev');
  Logger.log(`localEnv6666${fs.existsSync(localEnv)}`)
  const filePath = isProd && fs.existsSync(devEnv) ? devEnv : localEnv;
  Logger.log(`filePath:${filePath}`)
  return { path:filePath };
}
export default parseEnv();
