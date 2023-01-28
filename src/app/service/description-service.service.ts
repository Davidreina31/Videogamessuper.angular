import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Description } from '../models/description';

@Injectable({
  providedIn: 'root'
})
export class DescriptionServiceService {

  private _url: string = "http://localhost:5001/api/description";


  constructor(private _client: HttpClient) { }

  public get(): Observable<Description>{
    return this._client.get<Description>(this._url);
  }

}
