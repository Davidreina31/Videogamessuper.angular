import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Developer } from '../models/developer';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  token: string;
  private _url: string = "http://localhost:5081/api/developer/";

constructor(private _client: HttpClient) { }

public createDeveloper(d: Developer): Observable<Developer> {
  return this._client.post<Developer>(this._url, d);
}

public getOne(name: string): Observable<Developer>{
  return this._client.get<Developer>(this._url+ name);
}
}
