import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _url : string = "http://localhost:5001/api/comment/";

  constructor(private _client : HttpClient) { }

  public getCommentFromVideoGameId(id : number) : Observable<Comment[]>{
    return this._client.get<Comment[]>(this._url + id);
  }
}
