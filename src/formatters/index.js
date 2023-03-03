#!/usr/bin/env node
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

function formatData(data, formatName) {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case ('plain'):
      return plain(data);
    case ('json'):
      return json(data);
    default:
      throw new Error(`${formatName} - invalid type of output format`);
  }
}

export default formatData;
