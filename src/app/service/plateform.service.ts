import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plateform } from '../models/plateform';

@Injectable({
  providedIn: 'root'
})
export class PlateformService {

  token: string;
  private _url: string = "http://localhost:5081/api/plateform/";

  constructor(private _client: HttpClient) { }

  public getAll(): Observable <Plateform[]>{
    return this._client.get<Plateform[]>(this._url);
  }
}
