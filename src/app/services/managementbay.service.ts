import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementbayService {


  constructor(private http: HttpClient, private cookieService: CookieService,
    private base: BaseService) { }


    getptaschedule(): Observable<any> {
      var ptascheduleurl = `${this.base.base_url}/home/api-add-ptaschedule/`;
      var token = this.cookieService.get("token");
      var headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization" : "JWT "+token,
      });
      return this.http.get(ptascheduleurl, {headers:headers}).pipe(
        map( results => {
          console.log(results);
          return results;
        })
      ) 
    }



    savepatschedule(data): Observable<any> {
      var ptascheduleurl = `${this.base.base_url}/home/api-add-ptaschedule/`;
      var token = this.cookieService.get("token");
      var headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization" : "JWT "+token,
      });
      return this.http.post(ptascheduleurl, data, {headers:headers}).pipe(
        map( results => {
          console.log(results);
          return results;
        })
      )
    }






}
