import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  baseUrl:string;

  constructor(private httpClient:HttpClient) { 
    this.baseUrl=environment.apiBaseUrl+'/api/';
  }
  getAllUserDetails(){
    return this.httpClient.get<any>(this.baseUrl+'get-all-user')
  }

}
