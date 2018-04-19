import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.router';
import { MaterialModule } from './shared/material.module';
import { BtcComponent } from './btc/btc.component';

@NgModule({
  declarations: [
    AppComponent,
    BtcComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
