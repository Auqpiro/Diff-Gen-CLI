#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import process from 'process';
import parse from './parser.js';
import getDiff from './diff.js';
import stylish from './stylish.js';

const genDiff = (filepath1, filepath2) => {
  const pathFile1 = path.resolve(process.cwd(), filepath1);
  const pathFile2 = path.resolve(process.cwd(), filepath2);

  const obj1 = parse(fs.readFileSync(pathFile1), path.extname(pathFile1).slice(1));
  const obj2 = parse(fs.readFileSync(pathFile2), path.extname(pathFile2).slice(1));

  const result = getDiff(obj1, obj2);
  return stylish(result);
};

export default genDiff;
