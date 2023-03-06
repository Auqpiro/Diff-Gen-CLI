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
  const result = getKeys(obj1, obj2)
    .map((key) => {
      const node1 = _.cloneDeep(_.get(obj1, key));
      const node2 = _.cloneDeep(_.get(obj2, key));
      if (!Object.hasOwn(obj1, key)) {
        return { name: key, status: 'added', value: node2 };
      }
      if (!Object.hasOwn(obj2, key)) {
        return { name: key, status: 'removed', value: node1 };
      }
      if (_.isObject(node1) && _.isObject(node2)) {
        return { name: key, status: 'children', value: getDiff(node1, node2) };
      }
      if (node1 !== node2) {
        return { name: key, status: 'updated', value: [node1, node2] };
      }
      return { name: key, status: 'unchanged', value: node1 };
    });
  return result;
}

export default getDiff;
