declare var require: any;
const BASE58 = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const hash = require('hash.js');
const bs58 = require('base-x')(BASE58);

export class StringUtil {

  static getBase58Char(): string {
    const position = Math.floor(Math.random() * BASE58.length);
    return BASE58[position];
  }

  static generateMiniPrivateKey(): string {
    let miniPrivateKey = '';
    for (let i = 0; i < 30; i++) {
      miniPrivateKey = miniPrivateKey + StringUtil.getBase58Char();
    }
    return miniPrivateKey;
  }

  static generateValidMiniPrivateKey(attempts: number = 1000): string {
    let numAttempts = 0;
    while (numAttempts < attempts) {
      numAttempts++;
      const miniPrivateKey = StringUtil.generateMiniPrivateKey();
      if (StringUtil.hashString(miniPrivateKey + '?')[0] === 0) {
        return miniPrivateKey;
      }
    }
    console.error('No success in ' + attempts + ' attempts.');
  }

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

  static hashString(string: string) {
    return hash.sha256().update(string).digest();
  }

  static miniToPrivateKey(miniPrivateKey: string): string {
    return StringUtil.hashHexString(miniPrivateKey);
  }
}
