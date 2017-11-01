import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  ILatLng,
  Polyline,
  Spherical,
  BaseArrayClass
} from '@ionic-native/google-maps';

/**
 * Generated class for the BaseArrayClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-base-array-class',
  templateUrl: 'base-array-class.html',
  providers: [
    Spherical
  ]
})
export class BaseArrayClassPage {

  map: GoogleMap;
  distance: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    private spherical: Spherical,
    private _ngZone: NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolygonPage');
    this.loadMap();
  }
  loadMap() {
    let points: Array<ILatLng> = [
      {lat: 33.91636924837674, lng: -118.39605331420898},
      {lat: 33.90205144970967, lng: -118.39639663696288},
      {lat: 33.90190897196702, lng: -118.37905883789062},
      {lat: 33.89471353635718, lng: -118.3787155151367}
    ];
    this.map = this.googleMaps.create('map_canvas', {
      camera: {
        target: points
      }
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      return this.map.addPolyline({
        points: points
      });
    })
    .then((polyline: Polyline) => {
      let baseArray: BaseArrayClass<ILatLng> = polyline.getPoints();

      baseArray.mapAsync((point: ILatLng, next: (newElement: any) => void) => {
        this.map.addMarker({
          position: point,
          draggable: true
        }).then(next);
      }).then((markers: Marker[]) => {

        let baseArray2: BaseArrayClass<Marker> = new BaseArrayClass<Marker>(markers);
        baseArray2.forEach((marker: Marker, idx: number) => {
          marker.on('position_changed').subscribe((params) => {
            baseArray.setAt(idx, params[1]);
          });
        });

        // trigger the position_changed event for the first calculation.
        markers[0].trigger('position_changed', null, markers[0].getPosition());
      });

      baseArray.on('set_at').subscribe(() => {
        this._ngZone.run(() => {
          let distanceMeter: number = this.spherical.computeLength(baseArray);
          this.distance = (distanceMeter * 0.000621371192).toFixed(2) + " miles";
        });
      });
    });

  }
}
