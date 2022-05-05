import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContentDto } from 'src/app/interfaces/content';
import { ContentService } from 'src/app/services/content.service';
import { FeedbackDto } from 'src/app/interfaces/feedbackDto';
import { MessagesService } from 'src/app/services/messages.service';
import { HttpClient } from '@angular/common/http';
import { BillboardEntity } from 'src/app/interfaces/billboardEntity';
import { BillboardService } from 'src/app/services/billboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService, private billboardService: BillboardService, private contentService: ContentService, private messageService: MessagesService) { }

  ads: ContentDto[] = [];
  adsSliced: ContentDto[] = [];
  messages: FeedbackDto[] = [];
  profit: number = 0;
  clicks: number = 0;
  logs: any[] = [];
  billboards: BillboardEntity[] = [];

  ngOnInit(): void {
    if (localStorage.getItem("color"))
      this.updateTheme(JSON.parse(localStorage.getItem("color") || ''));

      this.http.get<number>("https://localhost:9000/api/v1/clicks").subscribe({
        next: (res) => this.clicks = res
      });

      this.http.get<any>("https://localhost:9000/api/v1/logs").subscribe({
        next: (res) => { this.logs = res.reverse().splice(0, 4); this.logs.forEach(l => l.dateTime = new Date(l.dateTime)); }
      })

      this.contentService.getAll().subscribe({
        next: (res) => { 
          this.ads = res.reverse(); 
          this.ads.forEach(a => { this.profit += a.totalCost; a.startDate = new Date(a.startDate); a.endDate = new Date(a.endDate); })
          this.adsSliced = this.ads.slice(0, 6);
        },
        error: () => this.toastr.error("Error gettings ads from the database.", 'Error')
      });

      this.billboardService.getAll().subscribe({
        next: res => { this.billboards = res; },
        error: () =>  this.toastr.error("Error gettings billboards from the database.", 'Error')
      });

      this.messageService.getAll().subscribe({
        next: (m) => { this.messages = m; },
        error: (e) => this.toastr.error("Can't get messages from the server.", "Error")
      });

    // this.contentService.getAll().subscribe({
    //   next: (ads) => this.ads = ads,
    //   error: () => this.toastr.error("Error gettings users from the database.", 'Error')
    // });
  }

  showSidebar() {
    let navigationElement: any = document.querySelector('.navigation');
    let main: any = document.querySelector('.main');
    navigationElement.classList.toggle('active');
    main.classList.toggle('active');
  }

  updateTheme(color: string) {
    if(color == '')
      return;

    localStorage.setItem("color", JSON.stringify(color));
    let r: any = document.querySelector(':root');
    r.style.setProperty('--color-primary', color);
  }
}
