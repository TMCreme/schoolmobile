/* eslint-disable no-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
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
      const ptascheduleurl = `${this.base.base_url}/home/api-add-ptaschedule/`;
      const token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'JWT '+token,
      });
      return this.http.get(ptascheduleurl, {headers}).pipe(
        map( results => {
          console.log(results);
          return results;
        })
      );
    }



    savepatschedule(data): Observable<any> {
      const ptascheduleurl = `${this.base.base_url}/home/api-add-ptaschedule/`;
      const token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'JWT '+token,
      });
      return this.http.post(ptascheduleurl, data, {headers}).pipe(
        map( results => {
          console.log(results);
          return results;
        })
      );
    }


    adminpasswordresetservice(data): Observable<any> {
      const adminpassreseturl = `${this.base.base_url}/home/api-admin-password-reset/`;
      const token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'content-type' : 'application/json',
        'Authorization' : 'JWT ' +token,
      });

      return this.http.post(adminpassreseturl, data, {headers}).pipe(
        map( results => {
          console.log(results);
          return results;
        })
      );
    }


    adminstudentremark(data): Observable<any> {
      const adminstudentremarkurl = `${this.base.base_url}/home/api-admin-add-student-remark/`;
      const token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'content-type' : 'application/json',
        'Authorization' : 'JWT ' +token,
      });

      return this.http.post(adminstudentremarkurl, data, {headers}).pipe(
        map( results => {
          console.log(results);
          return results;
        })
      );
    }

    adminlistclassview(data): Observable<any> {
      const adminlistclassurl = `${this.base.base_url}/home/api-admin-list-classes/`;
      const token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'content-type' : 'application/json',
        'Authorization' : 'JWT ' +token,
      });
      return this.http.post(adminlistclassurl, data, {headers}).pipe(
        map( results => {
          console.log(results);
          return results;
        })
      );
    }


    adminaddtimetableview(data): Observable<any> {
      const adminuploadtimetableurl = `${this.base.base_url}/home/api-admin-upload-class-timetable/`;
      var token = token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'Content-type' : 'application/json',
        'Authorization' : 'JWT '+token,
      });
      return this.http.post(adminuploadtimetableurl, data, {headers}).pipe(
        map(results => {
          console.log(results);
          return results;
        })
      );
    }





}
