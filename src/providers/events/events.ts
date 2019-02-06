import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from "../../environments/config";

@Injectable()
export class EventsProvider {

  constructor(public http: HttpClient) {
  }

  getAll() {
    return this.http.get(CONFIG.URL_API + "events");
  }

}
