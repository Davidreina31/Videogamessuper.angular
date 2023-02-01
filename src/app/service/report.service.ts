import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _url: string = "http://localhost:5081/api/Report/";

  constructor(private _client: HttpClient) { }

  public getAll(): Observable<Report[]>{
    return this._client.get<Report[]>(this._url);
  }

  public getOne(id: number): Observable<Report>{
    return this._client.get<Report>(this._url + id);
  }

  public createReport(r: Report): Observable<void>{
    return this._client.post<void>(this._url, r);
  }

  public deleteReport(id: number): Observable<void>{
    return this._client.delete<void>(this._url + id);
  }
}
