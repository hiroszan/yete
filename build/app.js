"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yargs = require("yargs");
const json5_1 = __importDefault(require("json5"));
const runner_1 = __importDefault(require("./runner"));
const process_1 = require("process");
const usage = `=======================================================================

  Yaml - Ejs Template Engine

  Usage:  
    yete -c "./example/yete.config.json5"

-----------------------------------------------------------------------`;
const argv = yargs.usage(usage).options({
    c: { type: 'string', alias: 'config', required: true },
}).argv;
const configPath = path_1.default.resolve(argv.c);
if (!fs_1.default.existsSync(configPath)) {
    logger_1.default.error('file not found.', { path: configPath });
    process_1.exit(1);
}
try {
    // load config
    const config = json5_1.default.parse(fs_1.default.readFileSync(configPath, 'utf8'));
    // load helper
    let helper = {};
    if (config.helper) {
        let fullpath = path_1.default.resolve(config.helper);
        let relpath = path_1.default.relative(__dirname, fullpath);
        logger_1.default.info('helper js: ', { path: fullpath, rel: relpath });
        helper = require(relpath);
        logger_1.default.info('helper', helper);
    }
    // run runners
    const runners = config.runs.map((run) => new runner_1.default(run, helper));
    runners.forEach((runner) => runner.run());
    process_1.exit(0);
}
catch (error) {
    logger_1.default.error(error);
}
//# sourceMappingURL=app.js.map