import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private _url: string = "http://localhost:5081/api/answer/";

  constructor(private _client: HttpClient) { }

  public getAllFromOneQuestion(id : number) : Observable<Answer[]>{
    return this._client.get<Answer[]>(this._url + id);
  }

  public createAnswer(a: Answer): Observable<void>{
    return this._client.post<void>(this._url, a);
  }

  public deleteAnswer(id: number): Observable<void>{
    return this._client.delete<void>(this._url + id);
  }
}
