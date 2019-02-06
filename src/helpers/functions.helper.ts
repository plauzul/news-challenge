import { Injectable } from '@angular/core';

@Injectable()
export class FunctionsHelper {

  formData(json: any) {
    let formData = new FormData();
    Object.keys(json).map((key) => {
      formData.append(key, json[key]);
    });
    return formData;
  }
}