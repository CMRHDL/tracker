var R = require("ramda");

export class LogUtil {

  static log = R.curry((message, error) => console.log(message, error));

  // LogUtil.logJSON("CURRENT: ");
  static logJSON = R.curry((message, error) => console.log(message, JSON.stringify(error)));

}
