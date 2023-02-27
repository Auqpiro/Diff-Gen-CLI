#!/usr/bin/env node
import yaml from 'js-yaml';

function parse(data, ext) {
  switch (ext) {
    case 'json':
      return JSON.parse(data, 'utf-8');
    case ('yaml' || 'yml'):
      return yaml.load(data, 'utf-8');
    default:
      return `${ext} - invalid type of extension`;
  }
}

export default parse;
