import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authUrl = 'http://192.168.33.20/api/v1/authentication';

    constructor(private http: HttpClient) {
    }

    auth(id: string, pass: string): Observable<any> {
        return this.http.put<any>(this.authUrl, {id: id, password: pass});
    }
}