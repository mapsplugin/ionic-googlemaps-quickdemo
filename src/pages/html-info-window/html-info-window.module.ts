import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HtmlInfoWindowPage } from './html-info-window';

@NgModule({
  declarations: [
    HtmlInfoWindowPage,
  ],
  imports: [
    IonicPageModule.forChild(HtmlInfoWindowPage),
  ],
})
export class HtmlInfoWindowPageModule {}
