import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { FunctionsHelper } from "../helpers/functions.helper";

import { TokenInterceptor } from "../interceptors/token.interceptor";

import { TabsPage } from '../pages/tabs/tabs';
import { NewsPage } from "../pages/news/news";
import { EventsPage } from "../pages/events/events";
import { NewsDetailsPage } from "../pages/news-details/news-details";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from "@ionic-native/facebook";
import { NewsProvider } from '../providers/news/news';
import { EventsProvider } from '../providers/events/events';
import { AuthProvider } from '../providers/auth/auth';
import { LoadingProvider } from '../providers/loading/loading'
import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    NewsPage,
    EventsPage,
    NewsDetailsPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    NewsPage,
    EventsPage,
    NewsDetailsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    StatusBar,
    SplashScreen,
    NewsProvider,
    EventsProvider,
    AuthProvider,
    LoadingProvider,
    FunctionsHelper,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
