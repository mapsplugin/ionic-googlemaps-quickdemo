import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  HtmlInfoWindow
} from '@ionic-native/google-maps';

/**
 * Generated class for the HtmlInfoWindowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-html-info-window',
  templateUrl: 'html-info-window.html',
})
export class HtmlInfoWindowPage {

  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HtmlInfoWindowPage');
    setTimeout(this.loadMap.bind(this), 1000);
  }

  loadMap() {
    this.map = this.googleMaps.create('map_canvas');
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let htmlInfoWindow = new HtmlInfoWindow();

      let html: string = [
        'This is <b>Html</b> InfoWindow',
        '<br>',
        '<button onclick="javascript:alert(\'clicked!\');">click here</button>',
      ].join("");
      htmlInfoWindow.setContent(html);

      this.map.addMarker({
        position: {lat: 0, lng: 0},
        draggable: true
      }).then((marker: Marker) => {

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          htmlInfoWindow.open(marker);
        });
        marker.trigger(GoogleMapsEvent.MARKER_CLICK);

      });
    });
  }
}
