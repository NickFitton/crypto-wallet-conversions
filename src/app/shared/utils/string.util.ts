declare var require: any;
const hash = require('hash.js');

export class StringUtil {
  static parseByteString(str: string) {
    const result = [];
    while (str.length >= 2) {
      result.push(parseInt(str.substring(0, 2), 16));

      str = str.substring(2, str.length);
    }

    return result;
  }

  static hashHexString(string: string) {
    return hash.sha256().update(string, 'hex').digest('hex');
  }
}
