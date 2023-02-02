import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plateform_VideoGame } from '../models/plateform_VideoGame';

@Injectable({
  providedIn: 'root'
})
export class PlateformVideogameService {

  token: string;
  private _url: string = "http://localhost:5081/api/plateformVideoGame/";

  constructor(private _client: HttpClient) { }

  public createPlateformVideoGame(pv: Plateform_VideoGame): Observable<Plateform_VideoGame> {
    return this._client.post<Plateform_VideoGame>(this._url, pv);
  }
  public getAllForVideoGameId(id: number): Observable<Plateform_VideoGame[]>{
    return this._client.get<Plateform_VideoGame[]>(this._url+ id);
  }
  public delete(id: number): Observable<void>{
    return this._client.delete<void>(this._url + id);
  }
}
