#!/usr/bin/env node
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

function parse(pathToFile) {
  const extension = path.extname(pathToFile).slice(1);
  switch (extension) {
    case 'json':
      return JSON.parse(fs.readFileSync(pathToFile), 'utf-8');
    case 'yml':
      return yaml.load(fs.readFileSync(pathToFile), 'utf-8');
    case 'yaml':
      return yaml.load(fs.readFileSync(pathToFile), 'utf-8');
    default:
      throw new Error(`${extension} - invalid type of extension`);
  }
}

export default parse;
