#!/usr/bin/env node
import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

// add function build row string
function buildRowString(acc, depth, status, name, callback) {
  const row = `${acc}${replacer.repeat(spacesCount * depth - 2)}${status} ${name}: ${callback}\n`;
  return row;
}

function iter(node, depth) {
  if (!_.isObject(node)) {
    return `${node}`;
  }
  return `${Object
    .entries(node)
    .reduce((str, [name, value]) => {
      const newStr = buildRowString(str, depth, ' ', name, iter(value, depth + 1));
      return newStr;
    }, '{\n')}${replacer.repeat((depth - 1) * spacesCount)}}`;
}

function buildStylishTree(node, depth = 1) {
  const result = `${node
    .reduce((str, { name, status, value }) => {
      switch (status) {
        case 'added':
          return buildRowString(str, depth, '+', name, iter(value, depth + 1));
        case 'removed':
          return buildRowString(str, depth, '-', name, iter(value, depth + 1));
        case 'unchanged':
          return buildRowString(str, depth, ' ', name, iter(value, depth + 1));
        case 'updated':
          return `${buildRowString(str, depth, '-', name, iter(value[0], depth + 1))}${buildRowString('', depth, '+', name, iter(value[1], depth + 1))}`;
        case 'children':
          return buildRowString(str, depth, ' ', name, buildStylishTree(value, depth + 1));
        default:
          throw new Error(`${status} - invalid type of status`);
      }
    }, '{\n')}${replacer.repeat(spacesCount * (depth - 1))}}`;
  return result;
}

function stylish(data) {
  return buildStylishTree(data);
}

export default stylish;
