import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from "../../model/user.model";
import { CONFIG } from "../../environments/config";
import { FunctionsHelper } from "../../helpers/functions.helper";

@Injectable()
export class AuthProvider {

  constructor(private http: HttpClient, private functionsHelper: FunctionsHelper) {
  }

  login(user: UserModel) {
    return this.http.post(CONFIG.URL_API + "auth/login", this.functionsHelper.formData(user));
  }

  register(user: UserModel) {
    return this.http.post(CONFIG.URL_API + "auth/register", this.functionsHelper.formData(user));
  }

}
