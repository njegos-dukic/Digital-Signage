import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContentDto } from 'src/app/interfaces/content';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  ads: ContentDto[] = [];

  constructor(private contentService: ContentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("color"))
      this.updateTheme(JSON.parse(localStorage.getItem("color") || ''));

    this.contentService.getAll().subscribe({
      next: (res) => { 
        this.ads = res; 
        this.ads.forEach(a => { a.startDate = new Date(a.startDate); a.endDate = new Date(a.endDate); })
      },
      error: () => this.toastr.error("Error gettings ads from the database.", 'Error')
    });
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

  toggleStatus(ad: ContentDto) {
    this.contentService.toggle(ad.id).subscribe({
      next: () => { ad.approved = !ad.approved; this.toastr.success(ad.adName + "'s status is updated.", 'Ad updated'); },
      error: () => { this.toastr.error("Error while updating " + ad.adName + "'s status.", 'Error'); }
    });
  }

  deleteAd(ad: ContentDto) {
    this.contentService.delete(ad.id).subscribe({
      next: () => { this.toastr.success(ad.adName + " is deleted.", 'Ad deleted'); this.ads = this.ads.filter(a => a != ad) },
      error: () => { this.toastr.error("Error while deleting " + ad.adName + ".", 'Error'); }
    });
  }

  getAd(ad: ContentDto) {
    window.open("https://localhost:9000/api/v1/content/ad/" + ad.id, "_blank");
  }
}
