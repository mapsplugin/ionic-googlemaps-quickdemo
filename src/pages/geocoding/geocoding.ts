import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Geocoder,
  BaseArrayClass,
  GeocoderResult,
  Marker
} from '@ionic-native/google-maps';

/**
 * Generated class for the GeocodingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-geocoding',
  templateUrl: 'geocoding.html',
  providers: [
    Geocoder
  ]
})
export class GeocodingPage {
  search_address: any;
  map1: GoogleMap;
  map2: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    private geocoder: Geocoder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeocodingPage');
    this.loadMap1();
    this.loadMap2();
  }

  loadMap1() {
    this.search_address = '1600 Amphitheatre Parkway, Mountain View, CA 94043, United States';
    this.map1 = this.googleMaps.create(document.getElementById('map_canvas1'));

    // Wait the MAP_READY before using any methods.
    this.map1.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("map ready for map_canvas1");
    });
  }

  onButton1_click(event) {
    this.map1.clear();

    // Address -> latitude,longitude
    this.geocoder.geocode({
      "address": this.search_address
    })
    .then((results: GeocoderResult[]) => {
      console.log(results);

      return this.map1.addMarker({
        'position': results[0].position,
        'title':  JSON.stringify(results[0].position)
      })
    })
    .then((marker: Marker) => {
      this.map1.animateCamera({
        'target': marker.getPosition(),
        'zoom': 17
      }).then(() => {
        marker.showInfoWindow();
      })
    });
  }


  loadMap2() {
    this.map2 = this.googleMaps.create('map_canvas2', {
      camera: {
        target: [
          {"lat": 21.306944, "lng": -157.858333},
          {"lat": 47.037874, "lng": -69.779490}
        ]
      }
    });

    // Wait the MAP_READY before using any methods.
    this.map2.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("map ready for map_canvas2");
    });
  }
  onButton2_click(event) {
    this.map2.clear();

    let start = Date.now();

        // Geocode multiple location
    this.geocoder.geocode({

      // US Capital cities
      "address": [
        "Montgomery, AL, USA", "Juneau, AK, USA", "Phoenix, AZ, USA",
        "Little Rock, AR, USA", "Sacramento, CA, USA", "Denver, CO, USA",
        "Hartford, CT, USA", "Dover, DE, USA", "Washington, DC, USA",
        "Tallahassee, FL, USA", "Atlanta, GA, USA", "Honolulu, HI, USA",
        "Boise, ID, USA", "Springfield, IL, USA", "Indianapolis, IN, USA",
        "Des Moines, IA, USA", "Topeka, KS, USA", "Frankfort, KY, USA",
        "Baton Rouge, LA, USA", "Augusta, ME, USA", "Annapolis, MD, USA",
        "Boston, MA, USA", "Lansing, MI, USA", "Saint Paul, MN, USA",
        "Jackson, MS, USA", "Jefferson City, MO, USA", "Helena, MT, USA",
        "Lincoln, NE, USA", "Carson City, NV, USA", "Concord, NH, USA",
        "Trenton, NJ, USA", "Santa Fe, NM, USA", "Albany, NY, USA",
        "Raleigh, NC, USA", "Bismarck, ND, USA", "Columbus, OH, USA",
        "Oklahoma City, OK, USA", "Salem, OR, USA", "Harrisburg, PA, USA",
        "Providence, RI, USA", "Columbia, SC, USA", "Pierre, SD, USA",
        "Nashville, TN, USA", "Austin, TX, USA", "Salt Lake City, UT, USA",
        "Montpelier, VT, USA", "Richmond, VA, USA", "Olympia, WA, USA",
        "Charleston, WV, USA", "Madison, WI, USA", "Cheyenne, Wyoming, USA"
      ]
    })
    .then((mvcArray: BaseArrayClass<GeocoderResult[]>) => {

      mvcArray.one('finish').then(() => {
        console.log('finish', mvcArray.getArray());
        return mvcArray.mapAsync((result: GeocoderResult[], next: (marker: Marker) => void) => {
          if (result.length === 0) {
            // Geocoder can not get the result
            return next(null);
          }
          this.map2.addMarker({
            'position': result[0].position,
            'title':  JSON.stringify(result)
          }).then(next);
        });
      })
      .then((markers: Marker[]) => {
        let end = Date.now();
        alert("duration: " + ((end - start) / 1000).toFixed(1) + " seconds");
      });

    });
  }
}
