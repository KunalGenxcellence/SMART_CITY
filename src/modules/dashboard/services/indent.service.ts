import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

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
  verifyIndentItem(data:any)
  {
    return this.httpClient.post(this.baseUrl+'verify-indentitem',data) 
  }
  createStock(data:any)
  {
    return this.httpClient.post<any>(this.baseUrl+'create-stock',data)
  }
  getAllStock(data:any)
  {
    return this.httpClient.post<any>(this.baseUrl+'get-all-stock',data)
  }
  stockItemList(data:any)
  {
    return this.httpClient.post<any>(this.baseUrl+'get-all-stocksummary',data)
  }

  removeStock(data:any)
  {
    return this.httpClient.post<any>(this.baseUrl+'remove-stock',data)
  }
  getalluserstocksummery(data:any){
      return this.httpClient.post<any>(this.baseUrl+'get-all-userstocksummery',data)
    }
    // fileUpload(data:any)
    // {
    //   return this.httpClient.post<any>(this.baseUrl+'doUpload',data)
    // }


    upload(formData:any){ 
      return this.httpClient.post<any>(this.baseUrl+'doUpload',formData)
  }


}
