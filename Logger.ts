import LoggerInstance from "./LoggerInstance";
import {LOG_LEVEL_NAMES, LogLevel, LoggerHashKey, LoggerKey} from "./types";

class Logger {
  private static DEFAULT_LOG_LEVEL: LogLevel = LogLevel.WARN;
  private static _instance: Logger;
  private _logs: { [key: LoggerHashKey]: LoggerInstance };

  private constructor() {
    this._logs = {};
  }

  private static getInstance(): Logger {
    if (!Logger._instance) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }

  private get logs(): { [key: LoggerHashKey]: LoggerInstance } {
    return this._logs;
  }

  public static new(name: LoggerKey, level?: LogLevel): LoggerInstance {
    return Logger.getInstance().new(Logger.key(name), level);
  }

  private new(key: LoggerHashKey, level?: LogLevel): LoggerInstance {
    if (!level) {
      level = Logger.DEFAULT_LOG_LEVEL;
    }
    if (this.logs[key]) {
      return this.logs[key];
    }
    const newLogger = new LoggerInstance(key, level);
    this.logs[key] = newLogger;
    return newLogger;
  }

  public static set(name: LoggerKey, level: LogLevel): void {
    Logger.getInstance().set(Logger.key(name), level);
  }

  private set(key: LoggerHashKey, level: LogLevel): void {
    if (!this.logs[key]) {
      console.warn("Logger.set", `Logger ${key} does not exist`);
      return;
    }
    this.logs[key].setLevel(level);
  }

  public static doLog(key: LoggerHashKey, level: LogLevel, ...msg: any[]): void {
    Logger.getInstance().doLog(key, level, ...msg);
  }

  public doLog(key: LoggerHashKey, level: LogLevel, ...msg: any[]): void {
    this.executeLog(level, key, ...msg);
  }

  protected executeLog(level: LogLevel, ...msg: any[]): void {
    const logStr = LOG_LEVEL_NAMES[level];
    let ft;
    switch (level) {
      case LogLevel.FATAL:
      case LogLevel.ERROR:
        ft = console.error;
        break;
      case LogLevel.WARN:
        ft = console.warn;
        break;
      case LogLevel.INFO:
        ft = console.info;
        break;
      case LogLevel.DEBUG:
        ft = console.debug;
        break;
      case LogLevel.TRACE:
        ft = console.trace;
        break;
      default: // LogLevel.OFF
        return;
    }
    ft(`[${logStr}]`, ...msg);
  }

  private static key(name: LoggerKey): LoggerHashKey {
    if (typeof name === "string") {
      return name;
    }
    else if (
      name.constructor &&
      name.constructor.name
    ) {
      return name.constructor.name;
    }
    else {
      console.error("Logger.key", name);
      throw new Error("Invalid key");
    }
  }
}

export default Logger;
