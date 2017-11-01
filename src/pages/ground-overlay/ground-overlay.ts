import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  ILatLng,
  GroundOverlay
} from '@ionic-native/google-maps';

/**
 * Generated class for the GroundOverlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ground-overlay',
  templateUrl: 'ground-overlay.html',
})
export class GroundOverlayPage {

  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CirclePage');
    this.loadMap();
  }

  loadMap() {
    let bounds: ILatLng[] = [
      {"lat": 40.712216, "lng": -74.22655},
      {"lat": 40.773941, "lng": -74.12544}
    ];

    this.map = this.googleMaps.create('map_canvas', {
      camera: {
        target: bounds
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      return this.map.addGroundOverlay({
        'url': 'assets/imgs/newark_nj_1922.jpg',
        'bounds': bounds,
        'opacity': 0.5,
        'clickable': true  // default = false
      });
    }).then((groundOverlay: GroundOverlay) => {

      // Catch the GROUND_OVERLAY_CLICK event
      groundOverlay.on(GoogleMapsEvent.GROUND_OVERLAY_CLICK).subscribe(() => {
        groundOverlay.setImage('assets/imgs/newark_nj_1922_2.jpg');
      });
    });
  }

}
