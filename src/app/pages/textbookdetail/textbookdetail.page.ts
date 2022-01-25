import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, MenuController, Platform } from '@ionic/angular';
import { File, FileSystem } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Router } from '@angular/router';


@Component({
  selector: 'app-textbookdetail',
  templateUrl: './textbookdetail.page.html',
  styleUrls: ['./textbookdetail.page.scss'],
})


export class TextbookdetailPage implements OnInit {

  constructor(private fileOpener: FileOpener,private document: DocumentViewer,
    private file: File, private http: HTTP, private navCtrl: NavController,
    private router: Router,private menuCtrl: MenuController) { }

  ngOnInit() {
    this.downloadFileAndStore()
    // this.document.viewDocument(this.file.applicationDirectory+'50YearsDataScience.pdf', 'application/pdf', options)

    console.log(this.file.dataDirectory)
    
  }
  
  async downloadFileAndStore() {
    //
    const filePath = this.file.dataDirectory + "50YearsDataScience.pdf"; 
                     // for iOS use this.file.documentsDirectory
    
    this.http.downloadFile("http://192.168.8.172:8030/media/50YearsDataScience.pdf", {}, {}, filePath).then(response => {
       // prints 200
       Filesystem.writeFile({
        path: "50YearsDataScience.pdf",
        data: response,
        directory: Directory.Documents
        // encoding: FilesystemEncoding.UTF8
      }).then((writeFileResult) => {
       Filesystem.getUri({
        directory: Directory.Documents,
        path: "50YearsDataScience.pdf"
      }).then(getUriResult => {
        const path = getUriResult.uri;
        alert("Full path URI is the following..."+ path)
        alert("Full write path URI is the following..."+ writeFileResult.uri)
        this.fileOpener.open(path, 'application/pdf')
        .then(() => alert('File is opened'))
                .catch(error => alert('Error openening file..........'+ error.message));
      }).catch(error1 => {
        alert(" Error opening file with File System. "+ error1);
        alert(" Error opening file with File System. "+ error1.error)
      });
    })
       alert('success block...'+ response);
       
    }).catch(err => {
        // prints 403
        alert('error block ... '+ err.status);
        // prints Permission denied
        console.log('error block ... '+ err.error);
    })
 }


 async goBack() {
  const openMenu = await this.menuCtrl.getOpen();
if (openMenu) {
  await openMenu.close();
  } else {
    this.router.navigate(['thankyou'])
  }
}

//  async viewFile() {
//   const filePath = this.file.dataDirectory + "50YearsDataScience.pdf"; 
//   Filesystem.getUri({
//     directory: Directory.Data,
//     path: filePath
//   }).then((getUriResult) => {
//     const path = getUriResult.uri;
//     this.fileOpener.open(path, 'application/pdf')
//   }, (error) => {
//     console.log(" Error openeing file with File System. ", error);
//     console.log(error.error)
//   });
//  }

}
const options: DocumentViewerOptions = {
  title: 'My PDF'
}


