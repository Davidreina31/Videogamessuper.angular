import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publisher } from '../models/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  token: string;
  private _url: string = "http://localhost:5081/api/publisher/";

  constructor(private _client: HttpClient) { }

  public createPublisher(p: Publisher): Observable<Publisher> {
    return this._client.post<Publisher>(this._url, p);
  }

  public getOne(name: string): Observable<Publisher>{
    return this._client.get<Publisher>(this._url+ name);
  }
}
