import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billboards',
  templateUrl: './billboards.component.html',
  styleUrls: ['./billboards.component.css']
})
export class BillboardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showSidebar() {
    let navigationElement: any = document.querySelector('.navigation');
    let main: any = document.querySelector('.main');
    navigationElement.classList.toggle('active');
    main.classList.toggle('active');
  }

  updateTheme(color: string) {
    let r: any = document.querySelector(':root');
    r.style.setProperty('--color-primary', color);
  }
}
