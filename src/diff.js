#!/usr/bin/env node
import _ from 'lodash';

function getKeys(obj1, obj2) {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keys = _.union(key1, key2);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys;
}

function getDiff(obj1, obj2) {
  const sortedKeys = getKeys(obj1, obj2);
  const result = sortedKeys
    .reduce((acc, key) => {
      const node1 = _.cloneDeep(_.get(obj1, key));
      const node2 = _.cloneDeep(_.get(obj2, key));
      if (!Object.hasOwn(obj1, key)) {
        acc[`+ ${key}`] = node2;
      } else if (!Object.hasOwn(obj2, key)) {
        acc[`- ${key}`] = node1;
      } else if (_.isObject(node1) && _.isObject(node2)) {
        acc[`  ${key}`] = getDiff(node1, node2);
      } else {
        if (node1 !== node2) {
          acc[`- ${key}`] = node1;
          acc[`+ ${key}`] = node2;
          return acc;
        }
        acc[`  ${key}`] = node1;
      }
      return acc;
    }, {});
  return result;
}

export default getDiff;
