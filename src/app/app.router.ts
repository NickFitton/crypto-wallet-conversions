import { Routes } from '@angular/router';
import { BtcComponent } from './btc/btc.component';

export const routes: Routes = [
  {path: 'btc', component: BtcComponent},
  {path: 'bitcoin', redirectTo: 'btc'},
  {path: '**', component: BtcComponent}
];
