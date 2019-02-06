import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from "../../environments/config";

@Injectable()
export class NewsProvider {

  constructor(public http: HttpClient) {
  }

  getAll() {
    return this.http.get(CONFIG.URL_API + "news");
  }

}
