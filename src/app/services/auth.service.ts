import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = `${environment.apiDomain}/api/v1/authentication`;

    constructor(private http: HttpClient) {
    }

    auth(id: string, pass: string): Observable<any> {
        return this.http.put<any>(this.apiUrl, {id: id, password: pass});
    }
}
