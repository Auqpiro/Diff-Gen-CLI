#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parser.js';
import getDiff from './diff.js';
import formatData from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathFile1 = path.resolve(process.cwd(), filepath1);
  const pathFile2 = path.resolve(process.cwd(), filepath2);
  const fileData1 = fs.readFileSync(pathFile1);
  const fileData2 = fs.readFileSync(pathFile2);
  const extFile1 = path.extname(pathFile1).slice(1);
  const extFile2 = path.extname(pathFile2).slice(1);
  const obj1 = parse(fileData1, extFile1);
  const obj2 = parse(fileData2, extFile2);
  const comparisonTree = getDiff(obj1, obj2);
  return formatData(comparisonTree, formatName);
};

export default genDiff;
