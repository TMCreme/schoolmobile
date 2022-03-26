import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private base: BaseService, private cookieService: CookieService,
    private http: HttpClient) { }

  userList(): Observable<any>{
  var userlisturl =   `${this.base.base_url}/home/api-admin-user-list/`;
  var token = this.cookieService.get("token");
  var data = JSON.stringify({"organization": this.cookieService.get("organization")});
  var headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "JWT "+token,
  });
  return this.http.post(userlisturl, data, {headers:headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  )
  }
}