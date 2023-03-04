### Hexlet tests and linter status:
[![Actions Status](https://github.com/Auqpiro/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Auqpiro/frontend-project-46/actions)
[![Node CI](https://github.com/Auqpiro/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Auqpiro/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/4f80ff9e859d4ed1e5c7/maintainability)](https://codeclimate.com/github/Auqpiro/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4f80ff9e859d4ed1e5c7/test_coverage)](https://codeclimate.com/github/Auqpiro/frontend-project-46/test_coverage)

### Description
CLI programm which can compare files and show the difference.
- Supported formats: json, yml
- Displaying the difference as: stylish, plain, json
- Supported for relative and absolute paths of files

### Dependencies
- Nodejs
- Make
- Ubuntu, MacOS or WSL (for Windows)

### Setup
```bash
git clone git@github.com:Auqpiro/frontend-project-46.git
make install
npm link
```

### Launch
To running EsLint
```bash
make lint
```
To running test
```bash
make test
```
To running test-coverage
```bash
make test-coverage
```

### Use case

**Open help instruction**
```bash
gendiff -h
```
```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and show a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

**Examples**
- Comparison of .json files
[![asciicast](https://asciinema.org/a/9Btvn7JIvMqiT2wQEYPf2P2bU.svg)](https://asciinema.org/a/9Btvn7JIvMqiT2wQEYPf2P2bU)
- Comparison of .yml files
[![asciicast](https://asciinema.org/a/4u76mnE7bRWJAz877SL9ALJ9z.svg)](https://asciinema.org/a/4u76mnE7bRWJAz877SL9ALJ9z)
- Comparison of nested files with default output format
[![asciicast](https://asciinema.org/a/yHuPTzK7HgqOHIwW3IyuPshaM.svg)](https://asciinema.org/a/yHuPTzK7HgqOHIwW3IyuPshaM)
- Comparison of files with plain output format
[![asciicast](https://asciinema.org/a/9Soaj90uZBogbYvOHqXZoHBhJ.svg)](https://asciinema.org/a/9Soaj90uZBogbYvOHqXZoHBhJ)
- Comparison of files with json output format
[![asciicast](https://asciinema.org/a/QMsr72Tn4nFTdprjkjr6u6S6r.svg)](https://asciinema.org/a/QMsr72Tn4nFTdprjkjr6u6S6r)