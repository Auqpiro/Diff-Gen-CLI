#!/usr/bin/env node
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import process from 'process';

const genDiff = (filepath1, filepath2) => {
  const pathFile1 = path.resolve(process.cwd(), filepath1);
  const pathFile2 = path.resolve(process.cwd(), filepath2);
  if (!fs.existsSync(pathFile1) || !fs.existsSync(pathFile2)) {
    return console.log(`err:\nFile1-${(fs.existsSync(pathFile1))
      ? 'found'
      : 'not found'}\nFile2-${(fs.existsSync(pathFile2))
      ? 'found'
      : 'not found'}`);
  }
  const extNameFile1 = path.extname(pathFile1).slice(1);
  const extNameFile2 = path.extname(pathFile2).slice(1);
  if (extNameFile1 !== 'json' || extNameFile2 !== 'json') {
    return console.log(`err:\n  File1 is ${extNameFile1}\n  File1 is ${extNameFile2}`);
  }
  const obj1 = JSON.parse(fs.readFileSync(pathFile1), 'utf-8');
  const obj2 = JSON.parse(fs.readFileSync(pathFile2), 'utf-8');
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keys = _.union(key1, key2).sort();
  const result = `${keys
    .reduce((acc, key) => {
      let str = '';
      if (!Object.hasOwn(obj1, key)) {
        str += `  + ${key}: ${_.get(obj2, key)}\n`;
      } else if (!Object.hasOwn(obj2, key)) {
        str += `  - ${key}: ${_.get(obj1, key)}\n`;
      } else if (_.get(obj1, key) !== _.get(obj2, key)) {
        str += `  - ${key}: ${_.get(obj1, key)}\n  + ${key}: ${_.get(obj2, key)}\n`;
      } else {
        str += `    ${key}: ${_.get(obj1, key)}\n`;
      }
      return acc + str;
    }, '{\n')}}`;
  return result;
};

export default genDiff;
