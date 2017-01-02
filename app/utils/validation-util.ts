var R = require("ramda");

export class ValidationUtil {

  static wrapUp = (value: any) => new Promise((resolve, reject) => value ? resolve(value) : reject());

  static isNumber = R.curry((prop, value) => !isNaN(parseFloat(value[prop])) ? value: false);

  static isTruthy = R.curry((prop, value) => !!value[prop] ? value: false);

}
