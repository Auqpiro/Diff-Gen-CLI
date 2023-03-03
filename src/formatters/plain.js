#!/usr/bin/env node
import _ from 'lodash';

export default function plain(data) {
  const getValue = (node) => {
    if (_.isArray(node)) {
      return [getValue(node[0]), getValue(node[1])];
    }
    if (_.isObject(node)) {
      return '[complex value]';
    }
    if (_.isString(node)) {
      return `'${node}'`;
    }
    return `${String(node)}`;
  };

  const iterTree = (node, path) => {
    const result = node
      .reduce((str, { name, status, value }) => {
        const newPath = [...path, name];
        switch (status) {
          case 'added':
            return `${str}Property '${newPath.join('.')}' was added with value: ${getValue(value)}\n`;
          case 'removed':
            return `${str}Property '${newPath.join('.')}' was removed\n`;
          case 'updated':
            return `${str}Property '${newPath.join('.')}' was updated. From ${getValue(value)[0]} to ${getValue(value)[1]}\n`;
          case 'nesting':
            return `${str}${iterTree(value, newPath)}`;
          case 'exists':
            return `${str}`;
          default:
            return `${status} - invalid type of status\n`;
        }
      }, '');
    return result;
  };

  return iterTree(data, []).trim();
}
