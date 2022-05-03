import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ContentDto } from 'src/app/interfaces/content';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    if (localStorage.getItem("color"))
      this.updateTheme(JSON.parse(localStorage.getItem("color") || ''));

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
