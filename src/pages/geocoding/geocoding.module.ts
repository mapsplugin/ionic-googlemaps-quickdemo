import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeocodingPage } from './geocoding';

@NgModule({
  declarations: [
    GeocodingPage,
  ],
  imports: [
    IonicPageModule.forChild(GeocodingPage),
  ],
})
export class GeocodingPageModule {}
