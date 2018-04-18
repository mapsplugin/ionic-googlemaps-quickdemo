import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  StreetView
} from '@ionic-native/google-maps';


/**
 * Generated class for the StreetViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-street-view',
  templateUrl: 'street-view.html',
})
export class StreetViewPage {

  panorama: StreetView;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StreetViewPage');
    this.loadMap();
  }

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.panorama = GoogleMaps.createPanorama('pano_canvas', {
      camera: {
        target: {lat: 42.345573, lng: -71.098326}
      }
    });
  }

}
