import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndentService {
  baseUrl:string;

  constructor(private httpClient:HttpClient) { 
    this.baseUrl=environment.apiBaseUrl+'/api/';
  }

  saveIndent(data:any){
    return this.httpClient.post(this.baseUrl+'create-indent',data)
  }

  getIndent(data:any){
    return this.httpClient.post(this.baseUrl+'get-all-indent',data)
  }

  getIndentItem(data:any){
    return this.httpClient.post(this.baseUrl+'get-all-indent',data)
  }

  getAllIndentItem(data:any)
  {
    return this.httpClient.post(this.baseUrl+'get-all-indentitem',data)
  }
}
