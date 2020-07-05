import logger from './logger';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const fpath = path.resolve('./example/enum/enums');
const structure = fs.readFileSync(fpath + '.yaml', 'utf8');
const template = fs.readFileSync(fpath + '.ejs', 'utf8');

logger.info('yaml: ', { filepath: fpath });
logger.info('ejs: ', { filepath: fpath });

const obj = YAML.parse(structure);
logger.info('yaml to object', { root: obj });

const output = ejs.render(template, { root: obj });
const outputPath = path.resolve('./example/output/enums.cs');
fs.writeFileSync(outputPath, output);