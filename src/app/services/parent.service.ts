/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private base: BaseService, private cookieService: CookieService,
    private http: HttpClient) { }

    studentList(): Observable<any>{
      const userlisturl =   `${this.base.base_url}/home/api-parent-student-view/`;
      const token = this.cookieService.get('token');
      const data = JSON.stringify({
        parent : this.cookieService.get('loggedinuser'),
      });
      console.log(data);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization : 'JWT '+token,
      });
      return this.http.post(userlisturl, data, {headers}).pipe(
        map(results => {
          console.log(results);
          return results;
        })
      );
      }
}
