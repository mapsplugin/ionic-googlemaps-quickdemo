import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CirclePage } from './circle';

@NgModule({
  declarations: [
    CirclePage,
  ],
  imports: [
    IonicPageModule.forChild(CirclePage),
  ],
})
export class CirclePageModule {}
