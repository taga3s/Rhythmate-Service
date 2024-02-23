//TODO: loggerを整備する

// import { createLogger, format, transports } from 'winston'

// const { colorize, simple, timestamp, errors, printf } = format

// export const logger = createLogger({
//   format: format.combine(
//     format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss'
//     }),
//     errors({ stack: true }),
//     printf(
//       ({ level, message, timestamp, stack }) => `[${timestamp}] [${level}] ${stack || message}`,
//     ),
//     colorize(),
//     simple(),
//     timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   ),
//   transports: [
//     new transports.File({
//       dirname: 'log',
//       filename: ''
//       maxsize: 5120000,
//       maxFiles: 5,
//       filename: ''
//     }),
//     new transports.Console({
//       level: 'debug',
//     }),
//   ],
// })
