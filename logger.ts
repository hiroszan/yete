import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

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
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
    }),
    dailyRotateFileTransport,
  ],
});

export default logger;
