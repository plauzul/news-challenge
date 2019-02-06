import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingProvider } from "../../providers/loading/loading";
import { AuthProvider } from "../../providers/auth/auth";
import { UserModel } from "../../model/user.model";
import { Storage } from '@ionic/storage';

import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public loadingProvider: LoadingProvider,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {
  }

  register() {
    this.authProvider.register(this.user)
    .subscribe((data: any) => {
      this.loadingProvider.dismiss();
      this.storage.set("token", data.token);
      this.navCtrl.setRoot(TabsPage);
    }, () => {
      this.loadingProvider.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Oops ocorreu um erro, ao registrar',
        subTitle: 'Tente novamente.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
