import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  ILatLng,
  Marker,
  StreetViewPanorama,
  StreetViewCameraPosition,
  StreetViewLocation
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

  panorama: StreetViewPanorama;
  map: GoogleMap;
  marker: Marker;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StreetViewPage');
    this.loadMap();
  }

  loadMap() {
    let initialPos: ILatLng = {lat: 42.345573, lng: -71.098326};

    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.panorama = GoogleMaps.createPanorama('pano_canvas', {
      camera: {
        target: initialPos
      }
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: initialPos,
        zoom: 17
      }
    });

    this.marker = this.map.addMarkerSync({
      flat: true,
      position: initialPos
    });

    // Move the marker position when the panorama camera has been moved.
    // (this.marker.position = this.panorama.position)
    this.panorama.bindTo('position', this.marker);

    // Move the map camera when the panorama camera has been moved.
    this.panorama.on(GoogleMapsEvent.PANORAMA_LOCATION_CHANGE).subscribe((params:any[]) => {
      let location: StreetViewLocation = params[0];
      this.map.animateCamera({
        target: location.latLng,
        duration: 1000
      });
    });

    // Change the marker bearing when the panorama camera is panning.
    this.panorama.on(GoogleMapsEvent.PANORAMA_CAMERA_CHANGE).subscribe((params: any[]) => {
      let camera: StreetViewCameraPosition = params[0];
      this.marker.setRotation(camera.bearing - 180);
    });

  }

}
