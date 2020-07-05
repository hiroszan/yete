import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { consoleFormat } from 'winston-console-format';

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: 'debug',
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    //format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ['timestamp'],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        })
      ),
    }),
    dailyRotateFileTransport,
  ],
});

export default logger;
