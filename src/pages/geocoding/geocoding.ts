import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
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
  templateUrl: 'geocoding.html'
})
export class GeocodingPage {
  map1: GoogleMap;
  map2: GoogleMap;
  loading: any;
  @ViewChild('search_address') search_address:ElementRef;

  constructor(public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad GeocodingPage');

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loadMap1();
    this.loadMap2();
  }

  loadMap1() {
    this.search_address.nativeElement.value = '1600 Amphitheatre Parkway, Mountain View, CA 94043, United States';
    this.map1 = GoogleMaps.create(document.getElementById('map_canvas1'));
  }

  onButton1_click(event) {
    this.loading.present();
    this.map1.clear();

    // Address -> latitude,longitude
    Geocoder.geocode({
      "address": this.search_address.nativeElement.value
    })
    .then((results: GeocoderResult[]) => {
      console.log(results);
      this.loading.dismiss();

      let marker: Marker = this.map1.addMarkerSync({
        'position': results[0].position,
        'title':  JSON.stringify(results[0].position)
      });
      this.map1.animateCamera({
        'target': marker.getPosition(),
        'zoom': 17
      }).then(() => {
        marker.showInfoWindow();
      })
    });
  }


  loadMap2() {
    this.map2 = GoogleMaps.create('map_canvas2', {
      camera: {
        target: [
          {"lat": 21.306944, "lng": -157.858333},
          {"lat": 47.037874, "lng": -69.779490}
        ]
      }
    });
  }
  onButton2_click(event) {
    this.map2.clear();

    this.loading.present();
    let start = Date.now();

    // Geocode multiple location
    Geocoder.geocode({

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
        let results: any[] = mvcArray.getArray();
        results.forEach((result: GeocoderResult[]) => {
          if (result.length === 0) {
            // Geocoder can not get the result
            return;
          }
          this.map2.addMarkerSync({
            'position': result[0].position,
            'title':  JSON.stringify(result)
          });
        });
        this.loading.dismiss();
        let end = Date.now();
        alert("duration: " + ((end - start) / 1000).toFixed(1) + " seconds");
      });

    });
  }
}
