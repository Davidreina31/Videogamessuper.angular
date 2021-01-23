import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private _url: string = "http://localhost:5001/api/question/";

  constructor(private _client: HttpClient) { }

  public getAllFromVideoGame(id: number): Observable<Question[]> {
    return this._client.get<Question[]>(this._url + id);
  }

  public getOne(id: number): Observable<Question> {
    return this._client.get<Question>("http://localhost:5001/api/Question?id=" + id);
  }

  public createQuestion(q: Question): Observable<void>{
    return this._client.post<void>(this._url, q);
  }

  public deleteQuestion (id: number): Observable<void>{
    return this._client.delete<void>(this._url + id);
  }
}
