import { Component } from '@angular/core';
import { NavController, NavParams, App, ToastController } from 'ionic-angular';
import { LoadingProvider } from "../../providers/loading/loading";
import { NewsProvider } from "../../providers/news/news";
import { NewsModel } from "../../model/news.model";

import { NewsDetailsPage } from "../news-details/news-details";

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  
  news: NewsModel = new NewsModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public loadingProvider: LoadingProvider,
    public newsProvider: NewsProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewWillEnter() {
    this.loadingProvider.present();
    this.newsProvider.getAll()
    .subscribe((data: NewsModel) => {
      this.loadingProvider.dismiss();
      this.news = data;
    }, () => {
      this.loadingProvider.dismiss();
      let toast = this.toastCtrl.create({
        message: "Erro ao obter as notícias!",
        duration: 3000
      });
      toast.present();
    });
  }

  toNewsDetails(news: NewsModel) {
    this.appCtrl.getRootNavs()[0].push(NewsDetailsPage, news);
  }

}
