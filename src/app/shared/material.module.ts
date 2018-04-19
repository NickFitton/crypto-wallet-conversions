import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  MatExpansionModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatStepperModule,
  MatInputModule,
  MatIconModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  exports: [
    FlexModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class MaterialModule {
}

git init
git add .
git commit -m "Setup project, add first conversions"
git remote add origin git@personal.github.com:NickFitton/crypto-wallet-conversions.git
git push -u origin master
