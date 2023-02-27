#!/usr/bin/env node
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import process from 'process';
import parse from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const pathFile1 = path.resolve(process.cwd(), filepath1);
  const pathFile2 = path.resolve(process.cwd(), filepath2);

  const obj1 = parse(fs.readFileSync(pathFile1), path.extname(pathFile1).slice(1));
  const obj2 = parse(fs.readFileSync(pathFile2), path.extname(pathFile2).slice(1));

  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keys = _.union(key1, key2);
  const sortedKeys = _.sortBy(keys);
  const result = `${sortedKeys
    .reduce((acc, key) => {
      let str = '';
      if (!Object.hasOwn(obj1, key)) {
        str += `\t+ ${key}: ${_.get(obj2, key)}\n`;
      } else if (!Object.hasOwn(obj2, key)) {
        str += `\t- ${key}: ${_.get(obj1, key)}\n`;
      } else if (_.get(obj1, key) !== _.get(obj2, key)) {
        str += `\t- ${key}: ${_.get(obj1, key)}\n\t+ ${key}: ${_.get(obj2, key)}\n`;
      } else {
        str += `\t  ${key}: ${_.get(obj1, key)}\n`;
      }
      return acc + str;
    }, '{\n')}}`;
  return result;
};

export default genDiff;
