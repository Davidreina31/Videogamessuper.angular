import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoGame } from '../models/video-game';

@Injectable({
  providedIn: 'root'
})
export class VideogameService {

  private _url: string ="http://localhost:5001/api/videogame/";

  constructor(private _client: HttpClient) { }

  public getAll(): Observable <VideoGame[]>{
    return this._client.get<VideoGame[]>(this._url); 
  }
}
