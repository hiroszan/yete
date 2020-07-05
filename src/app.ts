import logger from './logger';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const fpath = path.resolve('./example/condition/conditions');
const structure = fs.readFileSync(fpath + '.yaml', 'utf8');
const template = fs.readFileSync(fpath + '.ejs', 'utf8');

logger.info('yaml: ', { filepath: fpath });
logger.info('ejs: ', { filepath: fpath });

const obj = YAML.parse(structure);
logger.info('yaml to object', { root: obj });

const fullpath = path.resolve('./example/helper.js');
let relpath = path.relative(__dirname, fullpath);

relpath = relpath.split('.').slice(0, -1).join('.');
logger.info('helper: ', { path: relpath });

const helper = require(relpath);

const output = ejs.render(template, { root: obj, helper });
const outputPath = path.resolve('./example/output/conditions.cs');
fs.writeFileSync(outputPath, output);
