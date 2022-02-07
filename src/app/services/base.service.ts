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
  base_url = "http://46.51.157.194:8192";
  // public base_url = "http://127.0.0.1:8030";

  constructor( private http: HttpClient, private cookieService: CookieService) { }

userCreation(user): Observable<any> {
  let registrationurl = `${this.base_url}/home/api-register-user/`
  var token = this.cookieService.get("token");
  var headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "JWT "+token,
  });
  return this.http.post(registrationurl, user, {headers:headers}).pipe(
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

changepassword(user): Observable<any> {
  let changepasswordurl = `${this.base_url}/home/api-change-password/`;
  var token = this.cookieService.get("token");
  var headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "JWT "+token,
  });
  return this.http.patch(changepasswordurl, user, {headers:headers}).pipe(
    map(results => {
      console.log(results);
      return results;
    })
  )
}

// This function gets all students for admin to link the Parent that was just created.
adminstudentlist(): Observable<any>{
  var token = this.cookieService.get("token");
  var organization = this.cookieService.get("organization");
  var headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization" : "JWT "+token,
  });
  var data = JSON.stringify({"organization": organization});
  let studeliturl = `${this.base_url}/home/api-admin-student-list/`;
  return this.http.post(studeliturl, data, {headers:headers}).pipe(
    map( results => {
      console.log(results)
      this.cookieService.set("adminstudentlist", results["data"])
      return results;
    })
  )
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
  )
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
      return results
    })
  )
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
  
