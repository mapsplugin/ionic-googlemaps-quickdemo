import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StreetViewPage } from './street-view';

@NgModule({
  declarations: [
    StreetViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StreetViewPage),
  ],
})
export class StreetViewPageModule {}
