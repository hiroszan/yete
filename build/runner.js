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
const micromatch_1 = __importDefault(require("micromatch"));
class Runner {
    constructor(config, helper) {
        this.config = config;
        this.helper = helper;
    }
    posix(fpath) {
        return fpath.replace(/\\/g, '/');
    }
    run() {
        // const { ejs, yaml, outputDir, outputExt } = this.config;
        let fpath = path_1.default.resolve(this.config.ejs);
        const template = fs_1.default.readFileSync(fpath, 'utf8');
        logger_1.default.info('ejs: ', { path: fpath });
        this.config.yaml.forEach((yamlpath) => {
            if (yamlpath.indexOf('*') != -1) {
                // path wildcard
                yamlpath = this.posix(yamlpath);
                let fullpath = path_1.default.resolve(yamlpath);
                const dir = path_1.default.dirname(fullpath);
                logger_1.default.info('wildcard dir: ', { dir });
                const files = fs_1.default.readdirSync(dir).map((fname) => this.posix(path_1.default.resolve(dir, fname)));
                logger_1.default.info('wildcard dir files: ', { files, p: yamlpath });
                const matches = micromatch_1.default(files, yamlpath, { contains: true });
                logger_1.default.info('wildcard matches: ', { matches });
                matches.forEach((match) => this.render(template, match));
            }
            else {
                // path string
                this.render(template, yamlpath);
            }
        });
    }
    render(template, yamlpath) {
        yamlpath = path_1.default.resolve(yamlpath);
        logger_1.default.info('yaml: ', { path: yamlpath });
        const structure = fs_1.default.readFileSync(yamlpath, 'utf8');
        const obj = yaml_1.default.parse(structure);
        logger_1.default.info('yaml object', { root: obj });
        const content = ejs_1.default.render(template, { root: obj, helper: this.helper });
        let fname = path_1.default.basename(yamlpath);
        fname = fname.split('.').slice(0, -1).join('.');
        const outputPath = path_1.default.resolve(this.config.outputDir, fname + this.config.outputExt);
        fs_1.default.writeFileSync(outputPath, content);
        logger_1.default.info('render success: ', { output: outputPath });
    }
}
exports.default = Runner;
//# sourceMappingURL=runner.js.map