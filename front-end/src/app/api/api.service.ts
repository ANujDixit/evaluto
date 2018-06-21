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
  
  get(url: string, data?: any): Observable<any> {
    if (data) {
      // const params = new HttpParams({fromObject: obj});
      // let params = new HttpParams()
      // Object.keys(obj).map(k => params.set(k, obj[k]))
      
      return this.http.get(`${this.baseUrl}/${url}`, { params: data })
        .pipe(
            map((res: HttpResponse<any>) => this.extractData(res))
        );
     
    } else {
      return this.http.get(`${this.baseUrl}/${url}`)
        .pipe(
            map((res: HttpResponse<any>) => this.extractData(res))
        );
    }
  }
  
  post(url: string, body: Object): Observable<any>  {
    return this.http.post(`${this.baseUrl}/${url}`, JSON.stringify(body), httpOptions)
      .pipe(
            map((res: HttpResponse<any>) => this.extractData(res))
      );
  }
  
  put(url: string, body: Object): Observable<any>  {
    return this.http.put(`${this.baseUrl}/${url}`, JSON.stringify(body), httpOptions)
        .pipe(
            map((res: HttpResponse<any>) => this.extractData(res))
      );
  }
  
  delete(url: string): Observable<any>  {
    return this.http.delete(`${this.baseUrl}/${url}`)
      .pipe(
            map((res: HttpResponse<any>) => this.extractData(res))
      );
  }
  
  private extractData(resp) {
    return (resp["data"]) ? resp["data"] : resp ;
  }
  
}