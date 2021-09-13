import  { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: '__UNIFARM__' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: './storage/logs/errors.log',level:"error"}),
    new transports.File({filename: './storage/logs/access.log'})
  ]
});


