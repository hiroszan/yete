"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const yaml_1 = __importDefault(require("yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const fpath = path_1.default.resolve('./example/enum/enums');
const structure = fs_1.default.readFileSync(fpath + '.yaml', 'utf8');
const template = fs_1.default.readFileSync(fpath + '.ejs', 'utf8');
logger_1.default.info('yaml: ', { filepath: fpath });
logger_1.default.info('ejs: ', { filepath: fpath });
const obj = yaml_1.default.parse(structure);
logger_1.default.info('yaml to object', { root: obj });
const output = ejs_1.default.render(template, { root: obj });
const outputPath = path_1.default.resolve('./example/output/enums.cs');
fs_1.default.writeFileSync(outputPath, output);
//# sourceMappingURL=app.js.map