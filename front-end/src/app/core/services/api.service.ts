import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl = "https://evaluto-anytimetests.c9users.io:8082/api"
  // private baseUrl = "http://localhost:8082/api"

  constructor(private http: HttpClient) { }
  
  get(url: string, data?: any): Observable<any> {
    if (data) {
      return this.http.get(`${this.baseUrl}/${url}`, { params: data }).pipe(
            map(res => this.extractData(res))
        );
     
    } else {
      return this.http.get(`${this.baseUrl}/${url}`).pipe(
            map(res => this.extractData(res))
        );
    }
  }
  
  post(url: string, body: Object): Observable<any>  {
    return this.http.post(`${this.baseUrl}/${url}`, JSON.stringify(body), httpOptions).pipe(
            map(res => this.extractData(res))
      );
  }
  
  put(url: string, body: Object): Observable<any>  {
    return this.http.put(`${this.baseUrl}/${url}`, JSON.stringify(body), httpOptions).pipe(
            map(res => this.extractData(res))
      );
  }
  
  delete(url: string): Observable<any>  {
    return this.http.delete(`${this.baseUrl}/${url}`).pipe(
            map(res => this.extractData(res))
      );
  }
  
  private extractData(resp) {
    return (resp["data"]) ? resp["data"] : resp ;
  }
  
}