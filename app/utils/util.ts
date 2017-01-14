var R = require("ramda");

export class Util {

  static max = (arr: Array<any>, prop: string) => arr.map(R.path(prop.split('.'))).reduce(R.max, 0);

  // LoDash
  // static max = (arr: Array<any>, prop: string) => _.max(arr.map(entry => entry[prop])) || 0;

  /* classic
  static max(arr, prop) {
    return arr.map(function(entry) {
      return entry[prop];
    }).reduce(function(prev, curr) {
      return R.max(prev, curr);
    }, 0);
  }
  */

}
