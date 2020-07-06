import logger, { setLogLevel } from './logger';
import fs from 'fs';
import path from 'path';
import yargs = require('yargs');
import JSON5 from 'json5';
import Runner from './runner';
import process from 'process';

const usage = `=======================================================================

  Yaml - Ejs Template Engine

  Usage:
    yete -c "./example/yete.config.json5"

-----------------------------------------------------------------------`;
const argv = yargs.usage(usage).options({
  c: { type: 'string', alias: 'config', required: true },
}).argv;

const configPath = path.resolve(argv.c);
const configDir = path.dirname(configPath);

if (!fs.existsSync(configPath)) {
  logger.error('file not found.', { path: configPath });
  process.exit(1);
}

try {
  // load config
  const config: YeteConfig = JSON5.parse(fs.readFileSync(configPath, 'utf8'));

  if (config.log) {
    setLogLevel(config.log);
  }

  // setup working directory
  if (config.workingDir) {
    if (path.isAbsolute(config.workingDir)) {
      process.chdir(config.workingDir);
      logger.info('chdir: ' + config.workingDir);
    } else {
      let dir = path.relative(config.workingDir, configDir);
      dir = path.resolve(dir);
      process.chdir(dir);
      logger.info('chdir: ' + dir);
    }
  }

  // load helper
  let helper = {};
  if (config.helper) {
    let fullpath = path.resolve(config.helper);
    logger.info('helper js: ', { path: fullpath });

    helper = require(fullpath);
    logger.info('helper', helper);
  }

  // run runners
  const runners = config.runs.map((run) => new Runner(run, helper));
  runners.forEach((runner) => runner.run());
  process.exit(0);
} catch (error) {
  logger.error(error);
}
