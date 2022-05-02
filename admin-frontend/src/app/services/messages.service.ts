import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackDto } from '../interfaces/feedbackDto';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "https://localhost:9000/api/v1/messages";

  public getAll(): Observable<FeedbackDto[]> {
    return this.httpClient.get<FeedbackDto[]>(this.baseUrl);
  }

  public delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.baseUrl + "/" + id);
  }
}
