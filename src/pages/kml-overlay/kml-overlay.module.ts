import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KmlOverlayPage } from './kml-overlay';

@NgModule({
  declarations: [
    KmlOverlayPage,
  ],
  imports: [
    IonicPageModule.forChild(KmlOverlayPage),
  ],
})
export class KmlOverlayPageModule {}
