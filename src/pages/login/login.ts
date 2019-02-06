import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserModel } from "../../model/user.model";
import { AuthProvider } from "../../providers/auth/auth";
import { LoadingProvider } from "../../providers/loading/loading";
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from "../register/register";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: UserModel = new UserModel();
  userID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingProvider: LoadingProvider,
    public authProvider: AuthProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public fb: Facebook,
    public googlePlus: GooglePlus,
    public alertCtrl: AlertController
  ) {
  }

  close() {
    this.navCtrl.setRoot(TabsPage);
  }

  login() {
    this.loadingProvider.present();
    this.authProvider.login(this.user)
    .subscribe((data: any) => {
      this.loadingProvider.dismiss();
      this.storage.set("token", data.token);
      this.navCtrl.setRoot(TabsPage);
    }, () => {
      this.loadingProvider.dismiss();
      let toast = this.toastCtrl.create({
        message: "Email ou senha incorretos!",
        duration: 3000
      });
      toast.present();
    });
  }

  loginFacebook() {
    this.fb.login(['email'])
    .then((data: FacebookLoginResponse) => {
      this.loadingProvider.present();
      this.userID = data.authResponse.userID;      
      this.getDataFacebook();
    })
    .catch(() => {
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Tente novamente.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  getDataFacebook() {
    this.fb.api("/" + this.userID + "?fields=email", [])
    .then((data: any) => {
      this.user.email = data.email;
      this.user.password = btoa(this.userID);

      this.authProvider.login(this.user)
      .subscribe((data: any) => {
        this.loadingProvider.dismiss();
        this.storage.set("token", data.token);
        this.navCtrl.setRoot(TabsPage);
      }, err => {
        if(err.error.name == "email_not_found") {
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
        } else if(err.error.name == "password_not_found") {
          this.loadingProvider.dismiss();
          let toast = this.toastCtrl.create({
            message: "Email já registrado!",
            duration: 3000
          });
          toast.present();
        } else {
          this.loadingProvider.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Oops ocorreu um erro',
              subTitle: 'Tente novamente.',
              buttons: ['OK']
            });
            alert.present();
        }
      });
    })
    .catch(() => {
      this.loadingProvider.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Oops ocorreu um erro, ao obter seus dados',
        subTitle: 'Tente novamente.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  loginGoogle() {
    this.loadingProvider.present();
    this.googlePlus.login({})
    .then((data: any) => {
      this.user.email = data.email;
      this.user.password = btoa(data.user_id);

      this.authProvider.login(this.user)
      .subscribe((data: any) => {
        this.loadingProvider.dismiss();
        this.storage.set("token", data.token);
        this.navCtrl.setRoot(TabsPage);
      }, err => {
        if(err.error.name == "email_not_found") {
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
        } else if(err.error.name == "password_not_found") {
          this.loadingProvider.dismiss();
          let toast = this.toastCtrl.create({
            message: "Email já registrado!",
            duration: 3000
          });
          toast.present();
        } else {
          this.loadingProvider.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Oops ocorreu um erro',
              subTitle: 'Tente novamente.',
              buttons: ['OK']
            });
            alert.present();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      this.loadingProvider.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Tente novamente.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  toRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
