import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class BaseService {

  public headers = new HttpHeaders({
    'Content-type': 'application/json',
  })
  userprofile: any;
  base_url = "http://127.0.0.1:8030";

  constructor( private http: HttpClient, private cookieService: CookieService) { }

userCreation(user): Observable<any> {
  let registrationurl = `${this.base_url}/home/api-register-user/`
  return this.http.post(registrationurl, user, {headers:this.headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  )
}

login(user): Observable<any> {
  let loginurl: string = `${this.base_url}/home/api-login-user/`;
  return this.http.post(loginurl, user, {headers: this.headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  )
}


logout(): Observable <any> {
  var token = this.cookieService.get("token");
  var headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "JWT "+token,
  });
  let logouturl = `${this.base_url}/home/api-logout-user/`;
  return this.http.post(logouturl, {"auth_token": token}, {headers:headers}).pipe(
    map(results => {
      console.log(results)
      return results;
    })
  );
}































    
  }
  
