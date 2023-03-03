#!/usr/bin/env node
import stylish from './stylish.js';
import plain from './plain.js';

function formatData(data, formatName) {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case ('plain'):
      return plain(data);
    default:
      return `${formatName} - invalid type of output format`;
  }
}

export default formatData;
