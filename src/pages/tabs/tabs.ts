import { Component } from '@angular/core';

import { NewsPage } from "../news/news";
import { EventsPage } from "../events/events";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = EventsPage;

  constructor() {
  }
}
