declare var require: any;
import {Component} from '@angular/core';
import * as EC from 'elliptic/lib/elliptic/ec';

const hash = require('hash.js');
const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const bs58 = require('base-x')(BASE58);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private keyPair: EC.KeyPair;
  private ec: EC;

  private publicKey: string;
  public privateKey: string;
  public wif: string;
  public wifValidation: boolean;

  constructor() {
    this.privateKey = '';
    this.ec = new EC('secp256k1');
  }

  static parseByteString(str: string) {
    const result = [];
    while (str.length >= 2) {
      result.push(parseInt(str.substring(0, 2), 16));

      str = str.substring(2, str.length);
    }

    return result;
  }

  static hashKey(key: string) {
    return hash.sha256().update(key, 'hex').digest('hex');
  }

  generateKey() {
    this.keyPair = this.ec.genKeyPair();

    this.publicKey = this.keyPair.getPublic();
    this.privateKey = this.keyPair.getPrivate('hex');
  }

  generateWif() {
    this.generateKey();
    this.keyToWif();
    this.privateKey = '';
  }

  keyToWif() {
    const extendedKey = '80' + this.privateKey;
    const hashedKey = AppComponent.hashKey(AppComponent.hashKey(extendedKey));
    const checksum = hashedKey.substr(0, 8);
    const extendedKeyChecksum = extendedKey + checksum;
    const temp = AppComponent.parseByteString(extendedKeyChecksum);
    this.wif = bs58.encode(temp);
  }

  wifToKey() {
    const byteArray = bs58.decode(this.wif).toString('hex');
    this.privateKey = byteArray.substr(2, byteArray.length - 10);
  }

  wifCheck() {
    const byteArray = bs58.decode(this.wif).toString('hex');
    const originalChecksum = byteArray.substr(byteArray.length - 8, 8);
    const noChecksum = byteArray.substr(0, byteArray.length - 8);
    const keyHash = AppComponent.hashKey(AppComponent.hashKey(noChecksum));
    const calculatedChecksum = keyHash.substr(0, 8);
    this.wifValidation = originalChecksum === calculatedChecksum;
  }
}
