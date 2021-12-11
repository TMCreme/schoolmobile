import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-textbookdetail',
  templateUrl: './textbookdetail.page.html',
  styleUrls: ['./textbookdetail.page.scss'],
})
export class TextbookdetailPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
