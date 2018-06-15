import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  //private baseUrl = "https://ubuntu-swaaps.c9users.io:8082/api"
  private baseUrl = "http://localhost:8082/api"

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
  
  post(url: string, body: Object) {
    return this.http.post(`${this.baseUrl}/${url}`, JSON.stringify(body), httpOptions);
  }
  
  put(url: string, body: Object) {
    return this.http.put(`${this.baseUrl}/${url}`, JSON.stringify(body), httpOptions);
  }
  
  delete(url: string) {
    return this.http.delete(`${this.baseUrl}/${url}`);
  }
  
}