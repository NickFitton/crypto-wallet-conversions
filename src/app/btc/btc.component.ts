declare var require: any;
import { Component } from '@angular/core';
import { StringUtil } from '../shared/utils/string.util';
import { ECPair } from 'bitcoinjs-lib';

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const bs58 = require('base-x')(BASE58);

@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css']
})
export class BtcComponent {
  private keyPair: ECPair;

  public publicKey: string;
  public privateKey: string;
  public address: string;
  public wif: string;
  public wifValidation: boolean;
  public miniPrivateKey: string;

  constructor() {
    this.miniPrivateKey = StringUtil.generateValidMiniPrivateKey();
    this.privateKey = StringUtil.miniToPrivateKey(this.miniPrivateKey);
    this.wif = BtcComponent.keyToWif(this.privateKey);
    this.keyPair = ECPair.fromWIF(this.wif);
    this.publicKey = this.keyPair.getPublicKeyBuffer().toString('hex');
    this.address = this.keyPair.getAddress();
  }

  static keyToWif(privateKey: string): string {
    const extendedKey = '80' + privateKey;
    const hashedKey = StringUtil.hashHexString(StringUtil.hashHexString(extendedKey));
    const checksum = hashedKey.substr(0, 8);
    const extendedKeyChecksum = extendedKey + checksum;
    const temp = StringUtil.parseByteString(extendedKeyChecksum);
    return bs58.encode(temp);
  }
}
