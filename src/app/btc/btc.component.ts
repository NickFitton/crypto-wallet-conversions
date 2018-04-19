declare var require: any;
import { Component } from '@angular/core';
import * as EC from 'elliptic/lib/elliptic/ec';
import { StringUtil } from '../shared/utils/string.util';

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const bs58 = require('base-x')(BASE58);

@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css']
})
export class BtcComponent {
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
    const hashedKey = StringUtil.hashHexString(StringUtil.hashHexString(extendedKey));
    const checksum = hashedKey.substr(0, 8);
    const extendedKeyChecksum = extendedKey + checksum;
    const temp = StringUtil.parseByteString(extendedKeyChecksum);
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
    const keyHash = StringUtil.hashHexString(StringUtil.hashHexString(noChecksum));
    const calculatedChecksum = keyHash.substr(0, 8);
    this.wifValidation = originalChecksum === calculatedChecksum;
  }

}
