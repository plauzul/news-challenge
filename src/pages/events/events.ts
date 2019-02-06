import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { EventsModel } from "../../model/events.model";
import { EventsProvider } from "../../providers/events/events";
import { LoadingProvider } from "../../providers/loading/loading";
import { Storage } from '@ionic/storage';

import { LoginPage } from "../login/login";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: EventsModel = new EventsModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public loadingProvider: LoadingProvider,
    public eventsProvider: EventsProvider,
    public storage: Storage
  ) {
  }

  async ionViewWillEnter() {
    this.loadingProvider.present();
    let token = await this.storage.get("token");
    if(token) {
      this.eventsProvider.getAll()
      .subscribe((data: EventsModel) => {
        this.loadingProvider.dismiss();
        this.events = data;
      }, () => {
        this.loadingProvider.dismiss();
        this.appCtrl.getRootNavs()[0].setRoot(LoginPage);  
      });
    } else {
      this.loadingProvider.dismiss();
      this.appCtrl.getRootNavs()[0].setRoot(LoginPage);
    }
  }

}
