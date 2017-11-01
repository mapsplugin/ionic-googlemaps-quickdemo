import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  Polygon,
  BaseArrayClass,
  ILatLng,
  LatLng
} from '@ionic-native/google-maps';

/**
 * Generated class for the PolygonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-polygon',
  templateUrl: 'polygon.html',
})
export class PolygonPage {

  map: GoogleMap;

  GORYOKAKU_POINTS: ILatLng[] = [
    {lat: 41.79883, lng: 140.75675},
    {lat: 41.799240000000005, lng: 140.75875000000002},
    {lat: 41.797650000000004, lng: 140.75905},
    {lat: 41.79637, lng: 140.76018000000002},
    {lat: 41.79567, lng: 140.75845},
    {lat: 41.794470000000004, lng: 140.75714000000002},
    {lat: 41.795010000000005, lng: 140.75611},
    {lat: 41.79477000000001, lng: 140.75484},
    {lat: 41.79576, lng: 140.75475},
    {lat: 41.796150000000004, lng: 140.75364000000002},
    {lat: 41.79744, lng: 140.75454000000002},
    {lat: 41.79909000000001, lng: 140.75465}
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolygonPage');
    this.loadMap();
  }

  loadMap() {
    this.map = this.googleMaps.create('map_canvas', {
      camera: {
        target: this.GORYOKAKU_POINTS
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        return this.map.addPolygon({
          'points': this.GORYOKAKU_POINTS,
          'strokeColor' : '#AA00FF',
          'fillColor' : '#00FFAA',
          'strokeWidth': 10
        });
      })
      .then((polygon: Polygon) => {
        let points: BaseArrayClass<ILatLng> = polygon.getPoints();

        points.mapAsync((latLng: ILatLng, next: (marker: Marker) => void) => {
          this.map.addMarker({
            draggable: true,
            position: latLng
          }).then(next);
        }).then((markers: Marker[]) => {
          markers.forEach((marker: Marker, idx: number) => {
            marker.on(GoogleMapsEvent.MARKER_DRAG).subscribe((params) => {
              let position: LatLng = params[0];
              points.setAt(idx, position);
            });
          });
        });

      });

  }

}
