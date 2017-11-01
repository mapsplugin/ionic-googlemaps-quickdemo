import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Polyline,
  LatLng,
  Marker
} from '@ionic-native/google-maps';

/**
 * Generated class for the PolylinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-polyline',
  templateUrl: 'polyline.html',
})
export class PolylinePage {

  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolylinePage');
    this.loadMap();
  }

  loadMap() {
    let HND_AIR_PORT = {lat: 35.548852, lng: 139.784086};
    let SFO_AIR_PORT = {lat: 37.615223, lng: -122.389979};
    let HNL_AIR_PORT = {lat: 21.324513, lng: -157.925074};
    let AIR_PORTS = [
      HND_AIR_PORT,
      HNL_AIR_PORT,
      SFO_AIR_PORT
    ];

    this.map = this.googleMaps.create('map_canvas', {
      camera: {
        target: AIR_PORTS
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.addPolyline({
        points: AIR_PORTS,
        color: '#AA00FF',
        width: 10,
        geodesic: true,
        clickable: true  // clickable = false in default
      }).then((polyline: Polyline) => {
        polyline.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
          let position: LatLng = <LatLng>params[0];

          this.map.addMarker({
            position: position,
            title: position.toUrlValue(),
            disableAutoPan: true
          }).then((marker: Marker) => {
            marker.showInfoWindow();
          });
        });
      });
    });
  }

}
