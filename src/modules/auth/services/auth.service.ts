import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl: string;
    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.apiBaseUrl + '/api/';
    }

    getAuth$(): Observable<{}> {
        return of({});
    }
    login(body: any) {
        return this.httpClient.post<any>(this.baseUrl + 'login', body)
    }
}
