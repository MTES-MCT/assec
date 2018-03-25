/**
 *
 * ID3 Decision Tree Algorithm
 * https://zestedesavoir.com/tutoriels/962/les-arbres-de-decisions/premiere-version-id13/
 *
 * https://github.com/serendipious/nodejs-decision-tree-id3
 *
 * USAGE
 * ------------------------
 * const schema = require('my-form-schema');
 * const decision = 'alerte';
 * const parameters = ['canal', 'nomcanal', 'usage', 'origine'];
 * const dt = new DecisionTree(trainingdata, decision, parameters);
 * const prediction = dt.predict(my_form_values);
 *
 */
const lmap = require('lodash.map');
const lmax = require('lodash.maxby');
const lfilter = require('lodash.filter');
const lwithout = require('lodash.without');

const NODE_TYPES = {
  RESULT: 'result',
  FEATURE: 'feature',
  FEATURE_VALUE: 'feature_value',
};

const log2 = n => Math.log(n) / Math.log(2);
const uniq = entries => [...new Set(entries)];
const pluck = (arr, key) => arr.map(obj => obj[key]);
const osize = obj => obj.length || Object.keys(obj).length;

const prob = (value, list) => {
  // Computes probability of of a given value existing in a given list
  const occ = lfilter(list, elt => elt === value);
  return occ.length / list.length;
};

const entropy = (vals) => {
  const uniqueVals = uniq(vals);
  const probs = uniqueVals.map(x => prob(x, vals));
  const logvals = probs.map(p => -p * log2(p));
  return logvals.reduce((a, b) => a + b, 0);
};

// Computes gain
const gain = (data, target, feature) => {
  const setsize = osize(data);
  const attrvals = uniq(pluck(data, feature));
  const setentropy = entropy(pluck(data, target));
  const entropies = attrvals.map((n) => {
    const subset = data.filter(x => x[feature] === n);
    const mean = subset.length / setsize;
    return mean * entropy(pluck(subset, target));
  });
  const sumOfEntropies = entropies.reduce((a, b) => a + b, 0);
  return setentropy - sumOfEntropies;
};

// Computes Max gain across features to determine best split
const maxgain = (data, target, features) =>
  lmax(features, element => gain(data, target, element));

// Finds element with highest occurrence in a list
const mostcommon = (list) => {
  let largestFrequency = -1;
  let mostCommonElement = null;
  const elementFrequencyMap = {};
  list.forEach((element) => {
    const elementFrequency = (elementFrequencyMap[element] || 0) + 1;
    elementFrequencyMap[element] = elementFrequency;
    if (largestFrequency < elementFrequency) {
      mostCommonElement = element;
      largestFrequency = elementFrequency;
    }
  });
  return mostCommonElement;
};

// Generates random UUID
const randomUUID = () =>
  `_r${Math.random()
    .toString(32)
    .slice(2)}`;

// Creates a new tree
function createtree (data, target, features) {
  const plucked = pluck(data, target);
  const targets = uniq(plucked);

  if (!features.length) {
    const toptarget = mostcommon(targets);
    return {
      val: toptarget,
      name: toptarget,
      type: NODE_TYPES.RESULT,
      alias: toptarget + randomUUID(),
    };
  }

  if (targets.length === 1) {
    return {
      val: targets[0],
      name: targets[0],
      type: NODE_TYPES.RESULT,
      alias: targets[0] + randomUUID(),
    };
  }

  const bestfeature = maxgain(data, target, features);
  const remainingfeatures = lwithout(features, bestfeature);
  const possiblevalues = uniq(pluck(data, bestfeature));

  const node = {
    name: bestfeature,
    type: NODE_TYPES.FEATURE,
    alias: bestfeature + randomUUID(),
  };

  node.vals = lmap(possiblevalues, (v) => {
    const news = data.filter(x => x[bestfeature] === v);
    const childnode = {
      name: v,
      alias: v + randomUUID(),
      type: NODE_TYPES.FEATURE_VALUE,
    };
    childnode.child = createtree(news, target, remainingfeatures);
    return childnode;
  });
  return node;
}

// let model = null;
class DecisionTreeID3 {
  constructor (data, target, features) {
    this.data = data;
    this.target = target;
    this.features = features;
    this.model = createtree(data, target, features);
  }

  predict (ifcase) {
    let rootnode = Object.assign({}, { ...this.model });
    while (rootnode.type !== NODE_TYPES.RESULT) {
      const attr = rootnode.name;
      const sampleVal = ifcase[attr];
      let childNode = rootnode.vals
        .map(node =>
          (node.name === sampleVal ? Object.assign({}, { ...node }) : false))
        .filter(v => v);
      childNode = (childNode.length && childNode[0]) || false;
      rootnode = childNode
        ? Object.assign({}, { ...childNode.child })
        : Object.assign({}, { ...rootnode.vals[0].child });
    }
    return rootnode.val;
  }

  import (model) {
    this.model = model;
    return this;
  }

  toJSON () {
    return JSON.stringify(this.model);
  }
}

module.exports = DecisionTreeID3;
