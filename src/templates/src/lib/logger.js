import { createLogger, transports, format } from 'winston';

const {
  combine, timestamp, label, printf,
} = format;

const customFormat = printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`);

const createFormat = combine(
  label(),
  timestamp(),
  customFormat,
);

export default createLogger({
  format: createFormat,
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new transports.Console(),
  ],
});
