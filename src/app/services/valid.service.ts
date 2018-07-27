import {Injectable} from '@angular/core';
import {AuthValid} from '../view-models/auth-valid';

@Injectable({
    providedIn: 'root'
})
export class ValidService {

    constructor() {
    }

    authValid(id: string, pass: string): AuthValid {
        const authValid: AuthValid = {
            hasError: !id || !pass,
            msgForId: id ? '' : 'IDを入力して下さい。',
            msgForPass: pass ? '' : 'パスワードを入力して下さい。'
        };
        return authValid;
    }
}
