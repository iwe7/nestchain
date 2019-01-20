const _ = require('lodash');
module.exports = function(...args) {
  let output = {};
  _.toArray(args)
    .reverse()
    .forEach(item => {
      _.mergeWith(output, item, (objectValue, sourceValue) => {
        let res = _.isArray(sourceValue) ? sourceValue : undefined;
        return res;
      });
    });
  console.log(output);
  return output;
};
