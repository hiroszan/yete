import logger from './logger';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import micromatch from 'micromatch';
import _ from 'lodash';

export default class Runner {
  config: YeteRun;
  helper: any;
  mapImport: { [key: string]: any } = {};

  constructor(config: YeteRun, helper: any) {
    this.config = config;
    this.helper = helper;
  }

  private posix(fpath: string) {
    return fpath.replace(/\\/g, '/');
  }

  run() {
    // const { ejs, yaml, outputDir, outputExt } = this.config;

    // read includes
    if (this.config.yaml.includes) {
      const includes = this.config.yaml.includes;
      for (const key in includes) {
        let yamlpath = includes[key];
        const parsed = this.readYaml(yamlpath);
        logger.info('include - parsed: ', { path: yamlpath });
        this.mapImport[key] = parsed;
      }
    }

    let fpath = path.resolve(this.config.ejs);
    const template = fs.readFileSync(fpath, 'utf8');
    logger.info('ejs: ', { path: fpath });

    this.config.yaml.files.forEach((yamlpath) => {
      if (yamlpath.indexOf('*') != -1) {
        // path wildcard
        yamlpath = this.posix(yamlpath);

        let fullpath = path.resolve(yamlpath);
        const dir = path.dirname(fullpath);
        logger.info('wildcard dir: ', { dir });

        const files = fs
          .readdirSync(dir)
          .map((fname) => this.posix(path.resolve(dir, fname)));
        logger.info('wildcard dir files: ', { files, p: yamlpath });

        const matches = micromatch(files, yamlpath, { contains: true });
        logger.info('wildcard matches: ', { matches });

        if (matches.length > 0) {
          this.save(this.renderFromFiles(template, matches));
        }
      } else {
        // path string
        this.save(this.renderFromFile(template, yamlpath));
      }
    });
  }

  private readYaml(yamlpath: string) {
    yamlpath = path.resolve(yamlpath);
    const structure = fs.readFileSync(yamlpath, 'utf8');
    const obj = YAML.parse(structure);
    logger.debug('read yaml object', { path: yamlpath, root: obj });
    return obj;
  }

  private renderFromFiles(template: string, yamlPathes: string[]) {
    const items = yamlPathes.map((yamlPath) => this.readYaml(yamlPath));

    const obj = _.chain(items).concat().flatten().value();

    logger.debug('merged yaml object', { root: obj });
    return ejs.render(template, {
      root: obj,
      helper: this.helper,
      includes: this.mapImport,
    });
  }

  private renderFromFile(template: string, yamlPath: string) {
    const obj = this.readYaml(yamlPath);
    return ejs.render(template, {
      root: obj,
      helper: this.helper,
      includes: this.mapImport,
    });
  }

  private save(content: string) {
    const outputPath = path.resolve(this.config.output);

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content);
    logger.info('saved success: ', { output: outputPath });
  }
}
