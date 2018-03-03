import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BaseArrayClassPage } from '../pages/base-array-class/base-array-class';
import { PolygonPage } from '../pages/polygon/polygon';
import { HtmlInfoWindowPage } from '../pages/html-info-window/html-info-window';
import { MarkerClusterPage } from '../pages/marker-cluster/marker-cluster';
import { GeocodingPage } from '../pages/geocoding/geocoding';
import { PolylinePage } from '../pages/polyline/polyline';
import { MarkerPage } from '../pages/marker/marker';
import { CirclePage } from '../pages/circle/circle';
import { GroundOverlayPage } from '../pages/ground-overlay/ground-overlay';
import { TileOverlayPage } from '../pages/tile-overlay/tile-overlay';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from "@ionic-native/google-maps";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BaseArrayClassPage,
    PolygonPage,
    HtmlInfoWindowPage,
    MarkerClusterPage,
    GeocodingPage,
    PolylinePage,
    MarkerPage,
    CirclePage,
    GroundOverlayPage,
    TileOverlayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
