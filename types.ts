enum LogLevel {
  OFF = 7,
  FATAL = 6,
  ERROR = 5,
  WARN = 4,
  INFO = 3,
  DEBUG = 2,
  TRACE = 1,
  ALL = 0
};

const LOG_LEVEL_NAMES: string[] = [
  'ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL', 'OFF'
];

type LoggerKey = any;
type LoggerHashKey = string;

export {LogLevel, LOG_LEVEL_NAMES };
export type { LoggerKey, LoggerHashKey };
