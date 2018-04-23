import { Component } from '@angular/core';
import { BitcoinKeyUtils } from '../shared/utils/bitcoinKey.utils';
import { ECPair } from 'bitcoinjs-lib';

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
  public miniPrivateKey: string;

  constructor() {
    this.generateNewSet();
  }

  generateNewSet() {
    this.miniPrivateKey = BitcoinKeyUtils.generateValidMiniPrivateKey();
    this.privateKey = BitcoinKeyUtils.miniToPrivateKey(this.miniPrivateKey);
    this.wif = BitcoinKeyUtils.keyToWalletImportFormat(this.privateKey);
    this.keyPair = ECPair.fromWIF(this.wif);
    this.publicKey = this.keyPair.getPublicKeyBuffer().toString('hex');
    this.address = this.keyPair.getAddress();
  }
}
