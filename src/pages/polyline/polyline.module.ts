import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolylinePage } from './polyline';

@NgModule({
  declarations: [
    PolylinePage,
  ],
  imports: [
    IonicPageModule.forChild(PolylinePage),
  ],
})
export class PolylinePageModule {}
