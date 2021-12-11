import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class TextbookService {

  listurl = "http://127.0.0.1:8030/home/api-textbook/"

  constructor(private http: HttpClient) { }
  getTextBookList(): Observable<any>{
    var headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.get(`${this.listurl}?format=json`,{headers:headers})
    .pipe(
      map( results => {
        console.log(results);
        return results
      })
    )
  }
}


