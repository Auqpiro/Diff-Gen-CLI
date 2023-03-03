#!/usr/bin/env node
import path from 'path';
import process from 'process';
import parse from './parser.js';
import getDiff from './diff.js';
import formatData from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathFile1 = path.resolve(process.cwd(), filepath1);
  const pathFile2 = path.resolve(process.cwd(), filepath2);
  const obj1 = parse(pathFile1);
  const obj2 = parse(pathFile2);
  const result = getDiff(obj1, obj2);
  return formatData(result, formatName);
};

export default genDiff;
