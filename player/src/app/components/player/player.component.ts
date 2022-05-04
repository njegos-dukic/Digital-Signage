import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) { }

  ads: any[] = [];
  billboards: any[] = [];
  src: any;
  src1: string = "./../../assets/logo.png"

  selected: Boolean = false;
  selectedBillboard: any;

  isVideo: Boolean = false;
  isImage: Boolean = false;
  isOurs: Boolean = false;

  pngPrefix: string = "data:image/png;base64, "
  jpegPrefix: string = "data:image/jpeg;base64, "
  mp4Prefix: string = "data:video/mp4;base64, "

  ngOnInit(): void {
    let billboardsUrl = "https://localhost:9000/api/v1/billboard";
    this.httpClient.get<any>(billboardsUrl).subscribe({
      next: (res) => this.billboards = res,
      error: () => console.log("Error happened while getting billboards.")
    });
  }

  handleNext(willShowOurs: Boolean) {
    if (willShowOurs) {
      this.isVideo = false;
      this.isImage = false;
      this.isOurs = true;
      setTimeout(() => this.handleNext(false), 3000);
    }

    else if (this.ads[0].filename.toLowerCase().endsWith(".mp4")) {
      this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.mp4Prefix + this.ads[0].content);
      this.ads.push(this.ads.shift());
      this.isOurs = false;
      this.isVideo = true;
      this.isImage = false;
    }

    else if (this.ads[0].filename.toLowerCase().endsWith(".jpg") || this.ads[0].filename.toLowerCase().endsWith(".jpeg")) {
      this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.jpegPrefix + this.ads[0].content);
      this.ads.push(this.ads.shift());
      this.isOurs = false;
      this.isVideo = false;
      this.isImage = true;
      setTimeout(() => this.handleNext(true), 3000);
    }

    else if (this.ads[0].filename.toLowerCase().endsWith(".png")) {
      this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(this.pngPrefix + this.ads[0].content);
      this.ads.push(this.ads.shift());
      this.isOurs = false;
      this.isVideo = false;
      this.isImage = true;
      setTimeout(() => this.handleNext(true), 3000);
    }
  }

  handleSelected() {
    if (this.selectedBillboard) {
      console.log(this.selectedBillboard);

      let url = "https://localhost:9000/api/v1/content/ad?billboardId=" + this.selectedBillboard;
      this.httpClient.get<any>(url).subscribe({
        next: (res) => { 
          this.selected = true;
          this.ads = res;
          if(this.ads.length > 0) {
            this.handleNext(false);
          }
        },
        error: () => console.log("Error happened.") 
      });
    }

    else 
      alert("Molimo izaberite billbord.")
  }
}
