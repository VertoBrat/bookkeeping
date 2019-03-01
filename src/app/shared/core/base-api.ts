import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class BaseApi {

  private baseUrl: string = 'http://localhost:3000/';

  constructor(public http: HttpClient) {
  }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get<T>(url: string, params?:HttpParams): Observable<T> {
    return this.http.get<T>(this.getUrl(url), {params: params});
  }

  public post<T>(url: string, model: T): Observable<T> {
    return this.http.post<T>(this.getUrl(url), model);
  }

  public put<T>(model: T, url: string): Observable<T> {
    return this.http.put<T>(this.getUrl(url), model);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.getUrl(url));
  }

}
