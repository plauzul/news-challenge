import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsModel } from "../../model/news.model";

@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {

  news: NewsModel = new NewsModel();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.news = this.navParams.data;
  }

}
