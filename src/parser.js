#!/usr/bin/env node
import yaml from 'js-yaml';

function parse(data, ext) {
  switch (ext) {
    case 'json':
      return JSON.parse(data, 'utf-8');
    case 'yml':
      return yaml.load(data, 'utf-8');
    case 'yaml':
      return yaml.load(data, 'utf-8');
    default:
      throw new Error(`${ext} - invalid type of extension`);
  }
}

export default parse;
