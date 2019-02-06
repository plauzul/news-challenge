import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

  private loading: any;

  constructor(private loadingCtrl: LoadingController) {
  }

  present() {
    this.loading = this.loadingCtrl.create({
      content: "Espere um pouco..."
    });
    this.loading.present();
  }

  dismiss() {
    this.loading.dismiss();
  }

}
