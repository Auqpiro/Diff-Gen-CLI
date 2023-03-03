#!/usr/bin/env node
import _ from 'lodash';

export default function stylish(data) {
  const replacer = ' ';
  const spacesCount = 4;

  const iter = (node, acc) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    return `${Object
      .entries(node)
      .reduce((str, [key, value]) => {
        const newStr = `${str}${replacer.repeat(acc * spacesCount)}${key}: ${iter(value, acc + 1)}\n`;
        return newStr;
      }, '{\n')}${replacer.repeat((acc - 1) * spacesCount)}}`;
  };

  const iterTree = (node, acc) => {
    const result = `${node
      .reduce((str, { name, status, value }) => {
        switch (status) {
          case 'added':
            return `${str}${replacer.repeat(spacesCount * acc - 2)}+ ${name}: ${iter(value, acc + 1)}\n`;
          case 'removed':
            return `${str}${replacer.repeat(spacesCount * acc - 2)}- ${name}: ${iter(value, acc + 1)}\n`;
          case 'exists':
            return `${str}${replacer.repeat(spacesCount * acc)}${name}: ${iter(value, acc + 1)}\n`;
          case 'updated':
            return `${str}${replacer.repeat(spacesCount * acc - 2)}- ${name}: ${iter(value[0], acc + 1)}\n${replacer.repeat(spacesCount * acc - 2)}+ ${name}: ${iter(value[1], acc + 1)}\n`;
          case 'nesting':
            return `${str}${replacer.repeat(spacesCount * acc)}${name}: ${iterTree(value, acc + 1)}\n`;
          default:
            return `${status} - invalid type of status`;
        }
      }, '{\n')}${replacer.repeat(spacesCount * (acc - 1))}}`;
    return result;
  };

  return iterTree(data, 1);
}
