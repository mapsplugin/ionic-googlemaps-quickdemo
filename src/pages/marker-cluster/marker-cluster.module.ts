import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkerClusterPage } from './marker-cluster';

@NgModule({
  declarations: [
    MarkerClusterPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkerClusterPage),
  ],
})
export class MarkerClusterPageModule {}
