import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillboardDto, BillboardEntity } from '../interfaces/billboardEntity';

@Injectable({
  providedIn: 'root'
})
export class BillboardService {

  constructor(private httpClient: HttpClient) { }

  url = "https://localhost:9000/api/v1/billboard";

  getAll(): Observable<BillboardEntity[]> {
    return this.httpClient.get<BillboardEntity[]>(this.url);
  }

  toggleStatus(billboard: BillboardEntity): Observable<void> {
    let url = this.url + "/toggle/" + billboard.id;
    return this.httpClient.post<void>(url, null);
  }

  delete(id: number): Observable<void> {
    let url = this.url + "/" + id;
    return this.httpClient.delete<void>(url);
  }

  addBillboard(billboard: BillboardDto): Observable<BillboardEntity> {
    return this.httpClient.post<BillboardEntity>(this.url, billboard);
  }

  updateBillboard(billboard: BillboardDto): Observable<BillboardEntity> {
    return this.httpClient.put<BillboardEntity>(this.url, billboard);
  }
}
