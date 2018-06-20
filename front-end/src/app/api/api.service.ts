import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { transformHttpError } from '../common/common';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl = "https://evaluto-anytimetests.c9users.io:8082/api"
  //private baseUrl = "http://localhost:8082/api"

  constructor(private http: HttpClient) { }
  
  get(url: string, params?: Object) {
    if (params) {
      let params = new HttpParams()
      Object.keys(params).map(k => params.set(k, params[k]))
      return this.http.get(`${this.baseUrl}/${url}`, { params: params })
     
    } else {
      return this.http.get(`${this.baseUrl}/${url}`)
    }
  }
  
  post(url: string, body: Object): Observable<any>  {
    return this.http.post(`${this.baseUrl}/${url}`, JSON.stringify(body), httpOptions)
      .pipe(
            map((res: HttpResponse<any>) => this.extractData(res)),
            catchError(transformHttpError)
      );
  }
  
  put(url: string, body: Object): Observable<any>  {
    return this.http.put(`${this.baseUrl}/${url}`, JSON.stringify(body), httpOptions)
  }
  
  delete(url: string): Observable<any>  {
    return this.http.delete(`${this.baseUrl}/${url}`);
  }
  
  private extractData(resp) {
    return (resp["data"]) ? resp["data"] : resp ;
  }
  
}