# ts-logger

`ts-logger` is a TypeScript collection of classes for logging in your web applications. It offers a flexible and customizable way to log messages, making it easier to monitor and debug your code. This file file provides an overview of the project, instructions on how to use it, and details about the API.

## Table of Contents

- [ts-logger](#ts-logger)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Customization](#customization)

## Installation
**Note**: This project is still in development and not yet available on NPM. Therefore, the following instructions will allow you to add the project as a submodule to your project.

- Go to the directory where you want to add the code.
- Add the project as a submodule to your project:
```bash
git submodule add -b v0.1 https://github.com/Jkutkut/ts-logger.git
```

## Usage
```typescript
import {Logger, LogLevel} from 'ts-logger';

class Foo {
  private static log = Logger.new(Foo, LogLevel.DEBUG);
  // Default log level
  // private static log = Logger.new(Foo);
  ...

  public bar() {
    Foo.log.setLevel(LogLevel.ALL);
    Foo.log.trace('This is a trace message');
    Foo.log.debug('This is a debug message');
    Foo.log.info('This is an info message');
    Foo.log.warn('This is a warning message');
    Foo.log.error('This is an error message');
    Foo.log.fatal('This is a fatal message');
    Foo.log.setLevel(LogLevel.OFF);
    Foo.log.setLevel(LogLevel.INFO);
  }
}

// Change logger level outside of class
Logger.set(Foo, LogLevel.WARN);
```

## Customization
By default, the log messages will be sent to the console object. If you want to extend / modify this behavior, you can do it like the following example:
```typescript
import {Logger, LogLevel} from 'ts-logger';

class MyLogger extends Logger {
  protected executeLog(level: LogLevel, ...msg: any[]): void {
    // Do something with the log message
    // The information about the class is already included in the message
  }
}
```