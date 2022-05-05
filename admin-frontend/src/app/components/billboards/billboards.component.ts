import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BillboardDto, BillboardEntity } from 'src/app/interfaces/billboardEntity';
import { BillboardService } from 'src/app/services/billboard.service';

@Component({
  selector: 'app-billboards',
  templateUrl: './billboards.component.html',
  styleUrls: ['./billboards.component.css']
})
export class BillboardsComponent implements OnInit {

  billboards: BillboardEntity[] = [];
  billboardsCopy: BillboardEntity[] = [];
  query: string = "";
  newBillboard: BillboardDto = { id: 0, name: "", city: "", dailyRate: 0, available: true, lat: 0, lng: 0 };
  currentlyEditedBillboard!: BillboardEntity;
  currentlyEditedBillboardsLocation!: BillboardEntity;

  lat = 44.772;
  lng = 17.191;

  constructor(private toastr: ToastrService, private billboardService: BillboardService) { }

  ngOnInit(): void {
    if (localStorage.getItem("color"))
      this.updateTheme(JSON.parse(localStorage.getItem("color") || ''));
      
    this.billboardService.getAll().subscribe({
      next: res => { this.billboards = res; this.billboardsCopy = [...this.billboards] },
      error: () =>  this.toastr.error("Error gettings billboards from the database.", 'Error')
    });

    let newBillboardModal: any = document.getElementById("newBillboardModal");
    let editBillboardModal: any = document.getElementById("editBillboardModal");
    let mapsModal: any = document.getElementById("mapsModal");

    window.onclick = function(event) {
      if (event.target == newBillboardModal) {
        newBillboardModal.style.display = "none";
      }

      else if (event.target == editBillboardModal) {
        editBillboardModal.style.display = "none";
      }

      else if (event.target == mapsModal) {
        mapsModal.style.display = "none";
      }
    }
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

  toggleStatus(billboard: BillboardEntity) {
    this.billboardService.toggleStatus(billboard).subscribe({
      next: () => { billboard.available = !billboard.available; this.toastr.success(billboard.name + "'s status is updated.", 'Billboard updated'); },
      error: () => { this.toastr.error("Error while updating " + billboard.name + "'s status.", 'Error'); }
    });
  }

  deleteBillboard(billboard: BillboardEntity) {
    this.billboardService.delete(billboard.id).subscribe({
      next: () => { this.toastr.success(billboard.name + " is deleted.", 'Billboard deleted'); this.billboards = this.billboards.filter(b => b != billboard); this.billboardsCopy = [...this.billboards] },
      error: () => { this.toastr.error("Error while deleting " + billboard.name + ".", 'Error'); }
    });
  }

  showModal() {
    this.newBillboard = { id: 0, name: "", city: "", dailyRate: 0, available: true, lat: 0, lng: 0 };
    let modal: any = document.getElementById("newBillboardModal");
    modal.style.display = "block";
  }

  addBillboard(billboard: BillboardDto) {
    this.billboardService.addBillboard(billboard).subscribe({
      next: () => { this.closeModal(); this.ngOnInit(); this.newBillboard = { id: 0, name: "", city: "", dailyRate: 0, available: true, lat: 0, lng: 0 }; this.toastr.success(billboard.name + " is created.", 'Billboard created'); },
      error: (e: any) => { console.log(e); this.toastr.error(e.error, "Error while creating " + billboard.name + "'."); }
    });
  }
  
  closeModal() {
    this.newBillboard = { id: 0, name: "", city: "", dailyRate: 0, available: true, lat: 0, lng: 0 };
    let modal: any = document.getElementById("newBillboardModal");
    modal.style.display = "none";
  }

  startEditingBillboard(billboard: BillboardEntity) {
    let modal: any = document.getElementById("editBillboardModal");
    this.currentlyEditedBillboard = { ...billboard };
    modal.style.display = "block";
  }

  updateBillboard(billboard: BillboardDto) {
    this.billboardService.updateBillboard(billboard).subscribe({
      next: () => { this.closeEditModal(); this.ngOnInit(); this.toastr.success(billboard.name + " is updated.", 'Billboard updated'); },
      error: (e) => { this.toastr.error(e.error, "Error while updating " + billboard.name + "."); }
    });
  }

  closeEditModal() {
    let modal: any = document.getElementById("editBillboardModal");
    modal.style.display = "none";
  }

  startEditingBillboardLocation(billboard: BillboardEntity) {
    this.lat = billboard.lat;
    this.lng = billboard.lng;
    let modal: any = document.getElementById("mapsModal");
    this.currentlyEditedBillboardsLocation = { ...billboard };
    modal.style.display = "block";
  }

  updateBillboardLocation(billboard: BillboardDto) {
    billboard.lat = this.lat;
    billboard.lng = this.lng;
    this.billboardService.updateBillboard(billboard).subscribe({
      next: () => { this.closeMapsModal(); this.ngOnInit(); this.toastr.success(billboard.name + "'s location is updated.", 'Billboard updated'); },
      error: (e) => { this.toastr.error(e.error, "Error while updating " + billboard.name + "'s location."); }
    });
  }

  closeMapsModal() {
    let modal: any = document.getElementById("mapsModal");
    modal.style.display = "none";
  }

  placeMarker(event: any) {
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();
  }

  handleSearch(query: string) {
    this.billboards = [...this.billboardsCopy];
    if (query.length !== 0 || query !== null || query !== '') {
      this.billboards = [];
      this.billboardsCopy.forEach(b => {
        if (b.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || b.city.toLowerCase().indexOf(query.toLowerCase()) !== -1)
        this.billboards.push(b);
      });
    }
  }
}
