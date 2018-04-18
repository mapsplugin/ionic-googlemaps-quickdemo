import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  KmlOverlay,
  Polygon,
  ILatLng
} from '@ionic-native/google-maps';

/**
 * Generated class for the KmlOverlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kml-overlay',
  templateUrl: 'kml-overlay.html',
})
export class KmlOverlayPage {

  map: GoogleMap;
  loading: any;

  constructor(public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KmlOverlayPage');
    this.loadMap();
  }

  loadMap() {


    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

    this.map = GoogleMaps.create('map_canvas');
    this.map.addKmlOverlay({
      url: "assets/kmloverlay/polygon.kml"
    }).then((kmlOverlay: KmlOverlay) => {
      this.loading.dismiss();

      console.log(kmlOverlay);

      this.map.moveCamera(kmlOverlay.getDefaultViewport());

      // You can get additional information
      kmlOverlay.on(GoogleMapsEvent.KML_CLICK).subscribe((params: any) => {
        let overlay: Polygon = params[0]; // depends on overlay
        let latLng: ILatLng = params[1];
        console.log(overlay, latLng);
      });

    });

  }
}
