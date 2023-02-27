#!/usr/bin/env node
import _ from 'lodash';

export default function stylish(value, replacer = '  ') {
  const iter = (node, acc) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const newNode = Object.entries(node);
    return `${newNode.reduce((str, [key, item]) => {
      const newStr = `${str}${replacer.repeat(acc)}${key}: ${iter(item, acc + 1)}\n`;
      return newStr;
    }, '{\n')}${replacer.repeat(acc - 1)}}`;
  };
  return `${iter(value, 1)}`;
}
