"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const winston_console_format_1 = require("winston-console-format");
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';
const dailyRotateFileTransport = new winston_1.transports.DailyRotateFile({
    level: 'debug',
    filename: `${logDir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});
const logger = winston_1.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), 
    //format.ms(),
    winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.simple()),
    transports: [
        new winston_1.transports.Console({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.padLevels(), winston_console_format_1.consoleFormat({
                showMeta: true,
                metaStrip: ['timestamp'],
                inspectOptions: {
                    depth: Infinity,
                    colors: true,
                    maxArrayLength: Infinity,
                    breakLength: 120,
                    compact: Infinity,
                },
            })),
        }),
        dailyRotateFileTransport,
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map