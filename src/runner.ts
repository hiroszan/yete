import logger from './logger';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import micromatch from 'micromatch';
import { cwd } from 'process';

export default class Runner {
  config: YeteRun;
  helper: any;

  constructor(config: YeteRun, helper: any) {
    this.config = config;
    this.helper = helper;
  }

  private posix(fpath: string) {
    return fpath.replace(/\\/g, '/');
  }

  run() {
    // const { ejs, yaml, outputDir, outputExt } = this.config;
    let fpath = path.resolve(this.config.ejs);
    const template = fs.readFileSync(fpath, 'utf8');
    logger.info('ejs: ', { path: fpath });

    this.config.yaml.forEach((yamlpath) => {
      if (yamlpath.indexOf('*') != -1) {
        // path wildcard
        yamlpath = this.posix(yamlpath);

        let fullpath = path.resolve(yamlpath);
        const dir = path.dirname(fullpath);
        logger.info('wildcard dir: ', { dir });

        const files = fs.readdirSync(dir).map((fname) => this.posix(path.resolve(dir, fname)));
        logger.info('wildcard dir files: ', { files, p: yamlpath });

        const matches = micromatch(files, yamlpath, { contains: true });
        logger.info('wildcard matches: ', { matches });

        matches.forEach((match) => this.render(template, match));
      } else {
        // path string
        this.render(template, yamlpath);
      }
    });
  }

  private render(template: string, yamlpath: string) {
    yamlpath = path.resolve(yamlpath);
    logger.info('yaml: ', { path: yamlpath });

    const structure = fs.readFileSync(yamlpath, 'utf8');
    const obj = YAML.parse(structure);
    logger.info('yaml object', { root: obj });

    const content = ejs.render(template, { root: obj, helper: this.helper });

    let fname = path.basename(yamlpath);
    fname = fname.split('.').slice(0, -1).join('.');
    const outputPath = path.resolve(this.config.outputDir, fname + this.config.outputExt);

    fs.writeFileSync(outputPath, content);
    logger.info('render success: ', { output: outputPath });
  }
}
