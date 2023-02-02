import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoGame } from '../models/video-game';

@Injectable({
  providedIn: 'root'
})
export class VideogameService {

  private _url: string ="http://localhost:5081/api/videogame/";

  constructor(private _client: HttpClient) { }

  public AddGame(g: VideoGame): Observable<void> {
    return this._client.post<void>(this._url, g);
  }

  public getAll(): Observable <VideoGame[]>{
    return this._client.get<VideoGame[]>(this._url);
  }

  public getOne(id: number): Observable<VideoGame>{
    return this._client.get<VideoGame>(this._url + id);
  }

  public update(id: number, u:VideoGame): Observable<void>{
    return this._client.put<void>(this._url + id, u);
  }

  public delete(id: number): Observable<void>{
    return this._client.delete<void>(this._url + id);
  }
}
