import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserVideoGame } from '../models/user-video-game';
import { VideoGame } from '../models/video-game';

@Injectable({
  providedIn: 'root'
})
export class FavoritesGamesService {

  private _url: string = "http://localhost:5001/api/UserVideoGame/";

  constructor(private _client: HttpClient) { }

  public getAllByUser(id: number): Observable<UserVideoGame[]>{
    return this._client.get<UserVideoGame[]>(this._url + id);
  }

  public getVideoGamesByUserId(id: number): Observable<UserVideoGame[]>{
    return this._client.get<UserVideoGame[]>(this._url + id);
  }

  public AddVideoGame(uv: UserVideoGame): Observable<void>{
    return this._client.post<void>(this._url, uv);
  }

  public deleteVideoGame(userId: number, videoGameId: number): Observable<void>{
    return this._client.delete<void>("http://localhost:5001/api/UserVideoGame?UserId=" +userId+"&VideoGameId="+videoGameId);
  }
}
