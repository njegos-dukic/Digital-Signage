import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentDto } from '../interfaces/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "https://localhost:9000/api/v1/content";

  public getAll(): Observable<ContentDto[]> {
    return this.httpClient.get<ContentDto[]>(this.baseUrl);
  }

  public toggle(id: number): Observable<Boolean> {
    let url = this.baseUrl + "/toggle/" + id;
    return this.httpClient.post<Boolean>(url, null);
  }

  public delete(id: number): Observable<Boolean> {
    let url = this.baseUrl + "/delete/" + id;
    return this.httpClient.delete<Boolean>(url);
  }
}
