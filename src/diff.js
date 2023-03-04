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
      const returnObj = {};
      if (!Object.hasOwn(obj1, key)) {
        Object.assign(returnObj, { name: key, status: 'added', value: node2 });
      } else if (!Object.hasOwn(obj2, key)) {
        Object.assign(returnObj, { name: key, status: 'removed', value: node1 });
      } else if (_.isObject(node1) && _.isObject(node2)) {
        Object.assign(returnObj, { name: key, status: 'children', value: getDiff(node1, node2) });
      } else if (node1 !== node2) {
        Object.assign(returnObj, { name: key, status: 'updated', value: [node1, node2] });
      } else {
        Object.assign(returnObj, { name: key, status: 'unchanged', value: node1 });
      }
      return returnObj;
    });
  return result;
}

export default getDiff;
