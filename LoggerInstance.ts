import {Logger} from ".";
import {LogLevel, LoggerHashKey} from "./types";

class LoggerInstance {
  private _key: LoggerHashKey;
  private _level: LogLevel;

  public constructor(key: LoggerHashKey, level: LogLevel) {
    this._key = key;
    this._level = level;
  }

  private get key(): LoggerHashKey {
    return this._key;
  }

  public get level(): LogLevel {
    return this._level;
  }

  public setLevel(level: LogLevel): void {
    this._level = level;
  }

  public fatal(...msg: any[]): void {
    this.log(LogLevel.FATAL, ...msg);
  }

  public error(...msg: any[]): void {
    this.log(LogLevel.ERROR, ...msg);
  }

  public warn(...msg: any[]): void {
    this.log(LogLevel.WARN, ...msg);
  }

  public info(...msg: any[]): void {
    this.log(LogLevel.INFO, ...msg);
  }

  public debug(...msg: any[]): void {
    this.log(LogLevel.DEBUG, ...msg);
  }

  public trace(...msg: any[]): void {
    this.log(LogLevel.TRACE, ...msg);
  }

  private log(level: LogLevel, ...msg: any[]): void {
    if (level < this.level) {
      return;
    }
    Logger.doLog(this.key, level, ...msg);
  }
};

export default LoggerInstance;
