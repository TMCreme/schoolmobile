/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
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
<<<<<<< HEAD
  public base_url = "http://schmgt.herokuapp.com";
  // eslint-disable-next-line @typescript-eslint/naming-convention
  /* public base_url = 'http://127.0.0.1:8030'; */
=======
  // public base_url = "http://46.51.157.194:8192";
  public base_url = "http://127.0.0.1:8030";
>>>>>>> 029007b15a96183c70b1ccd46bfbf1bdc59d72bf

  constructor( private http: HttpClient, private cookieService: CookieService) { }

userCreation(user): Observable<any> {
  const registrationurl = `${this.base_url}/home/api-register-user/`;
  const token = this.cookieService.get('token');
  const headers = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization : 'JWT '+token,
  });
  return this.http.post(registrationurl, user, {headers}).pipe(
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

changepassword(user): Observable<any> {
  const changepasswordurl = `${this.base_url}/home/api-change-password/`;
  const token = this.cookieService.get('token');
 const headers = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization : 'JWT '+token,
  });
  return this.http.patch(changepasswordurl, user, {headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  );
}

// This function gets all students for admin to link the Parent that was just created.
adminstudentlist(): Observable<any>{
  const token = this.cookieService.get('token');
  const organization = this.cookieService.get('organization');
  var headers = new HttpHeaders({
    "Content-Type": 'application/json',
    'Authorization' : 'JWT '+token,
  });
  var data = JSON.stringify({"organization": organization});
  let studeliturl = `${this.base_url}/home/api-admin-student-list/`;
  return this.http.post(studeliturl, data, {headers:headers}).pipe(
    map( results => {
      console.log(results);
      this.cookieService.set("adminstudentlist", results["data"]);
      return results;
    })
  );
}

// This function links the parent to the Student
studentparentlink(user): Observable<any> {
  var token = this.cookieService.get("token");
  var studentparentlinkurl = `${this.base_url}/home/api-student-parent-link/`;
  var headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "JWT "+token,
  });
  return this.http.post(studentparentlinkurl, user, {headers:headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  );
}


// This function gets all the levels/Classes/Stages/Forms in the particular School
adminlevellist(): Observable<any> {
  // this.cookieService.delete("parentname")
  var token = this.cookieService.get("token");
  var organization = this.cookieService.get("organization");
  var levellinkurl = `${this.base_url}/home/api-student-link-level/`;
  var headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "JWT "+token,
  });
  var data = JSON.stringify({"organization": organization});
  return this.http.post(levellinkurl, data, {headers:headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  );
}



// This function adds the user to the class/level/stage in the schoool

adminstudentlevelupdate(data): Observable<any> {
  var token = this.cookieService.get("token");

  var levellinkupdate = `${this.base_url}/home/api-student-level-update/`;
  var headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "JWT "+token,
  });
  return this.http.post(levellinkupdate, data, {headers:headers}).pipe(
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

