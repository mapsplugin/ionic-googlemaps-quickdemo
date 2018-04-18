import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  ILatLng,
  Circle,
  Marker,
  Spherical
} from '@ionic-native/google-maps';

/**
 * Generated class for the CirclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-circle',
  templateUrl: 'circle.html'
})
export class CirclePage {

  map: GoogleMap;

  constructor() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CirclePage');
    this.loadMap();
  }

  loadMap() {
    let center: ILatLng = {"lat": 32, "lng": -97};

    let radius = 300;  // radius (meter)

    // Calculate the positions
    let positions: ILatLng[] = [0, 90, 180, 270].map((degree: number) => {
      return Spherical.computeOffset(center, radius, degree);
    });

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: positions,
        padding: 100
      }
    });

    let marker: Marker = this.map.addMarkerSync({
      position: positions[0],
      draggable: true,
      title: 'Drag me!'
    });
    let circle: Circle = this.map.addCircleSync({
      'center': center,
      'radius': radius,
      'strokeColor' : '#AA00FF',
      'strokeWidth': 5,
      'fillColor' : '#00880055'
    });

    marker.on('position_changed').subscribe((params: any) => {
      let newValue: ILatLng = <ILatLng>params[1];
      let newRadius: number = Spherical.computeDistanceBetween(center, newValue);
      circle.setRadius(newRadius);
    });
  }

}
