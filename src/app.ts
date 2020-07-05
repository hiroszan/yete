import logger from './logger';
import fs from 'fs';
import path from 'path';
import yargs = require('yargs');
import JSON5 from 'json5';
import Runner from './runner';
import { exit } from 'process';

const usage = `=======================================================================

  Yaml - Ejs Template Engine

  Usage:  
    yete -c "./example/yete.config.json5"

-----------------------------------------------------------------------`;
const argv = yargs.usage(usage).options({
  c: { type: 'string', alias: 'config', required: true },
}).argv;

const configPath = path.resolve(argv.c);
if (!fs.existsSync(configPath)) {
  logger.error('file not found.', { path: configPath });
  exit(1);
}

try {
  // load config
  const config: YeteConfig = JSON5.parse(fs.readFileSync(configPath, 'utf8'));

  // load helper
  let helper = {};
  if (config.helper) {
    let fullpath = path.resolve(config.helper);
    let relpath = path.relative(__dirname, fullpath);
    logger.info('helper js: ', { path: fullpath, rel: relpath });

    helper = require(relpath);
    logger.info('helper', helper);
  }

  // run runners
  const runners = config.runs.map((run) => new Runner(run, helper));
  runners.forEach((runner) => runner.run());
  exit(0);
} catch (error) {
  logger.error(error);
}
