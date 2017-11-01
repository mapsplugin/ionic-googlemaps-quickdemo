import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TileOverlayPage } from './tile-overlay';

@NgModule({
  declarations: [
    TileOverlayPage,
  ],
  imports: [
    IonicPageModule.forChild(TileOverlayPage),
  ],
})
export class TileOverlayPageModule {}
