import { Component, OnInit } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Component({
  selector: 'app-textbookdetail',
  templateUrl: './textbookdetail.page.html',
  styleUrls: ['./textbookdetail.page.scss'],
})
export class TextbookdetailPage implements OnInit {

  constructor(private http: HTTP, private file: File) { }

  ngOnInit() {
    this.downloadFileAndStore()
  }
  private downloadFileAndStore() {
    //
    const filePath = this.file.dataDirectory + "fileName"; 
                     // for iOS use this.file.documentsDirectory
    
    this.http.downloadFile('http://127.0.0.1:8030/media/50YearsDataScience.pdf', {}, {}, filePath).then(response => {
       // prints 200
       console.log('success block...', response);
    }).catch(err => {
        // prints 403
        console.log('error block ... ', err);
        // prints Permission denied
        console.log('error block ... ', err.error);
    })
 }

}
