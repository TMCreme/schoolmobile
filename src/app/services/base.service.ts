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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-type': 'application/json',
  });
  userprofile: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  base_url = 'http://46.51.157.194:8192';

  constructor( private http: HttpClient, private cookieService: CookieService) { }

userCreation(user): Observable<any> {
  const registrationurl = `${this.base_url}/home/api-register-user/`;
  return this.http.post(registrationurl, user, {headers:this.headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  );
}

login(user): Observable<any> {
  const loginurl = `${this.base_url}/home/api-login-user/`;
  return this.http.post(loginurl, user, {headers: this.headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  );
}


logout(): Observable <any> {
  const token = this.cookieService.get('token');
  const headers = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization : 'JWT '+token,
  });
  const logouturl = `${this.base_url}/home/api-logout-user/`;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return this.http.post(logouturl, {auth_token: token}, {headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  );
}
































  }

