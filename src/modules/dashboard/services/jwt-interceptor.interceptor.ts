import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor(private router : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.toLocaleLowerCase().includes('/login')){

    let access_id= localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem("user_details") || '{}').user_id:null;
    if(access_id){

      request = this.updateRequest(request, access_id);
    } else {
       localStorage.clear();
       this.router.navigate(['/auth'])
    }
    }
    return next.handle(request);
  }

  updateRequest(request: HttpRequest<any>, access_id?:any) {
    request = request.clone({
        headers: this.addExtraHeaders(request.headers, access_id)
    });

    return request;
}
addExtraHeaders(headers: HttpHeaders, access_id:any): HttpHeaders {
    if (access_id) {
        headers = headers.append('created_Id', `${access_id}`);
    }
    return headers;
}

}
