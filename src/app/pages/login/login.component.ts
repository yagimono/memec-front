import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ValidService} from '../../services/valid.service';
import {AuthValid} from '../../view-models/auth-valid';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    msg = '';
    authValid: AuthValid = {
        hasError: false,
        msgForId: '',
        msgForPass: ''
    };

    constructor(private authService: AuthService,
                private validService: ValidService,
                private router: Router) {
    }

    ngOnInit() {
    }

    login(id: string, pass: string): void {
        this.msg = '';
        this.authValid = this.validService.authValid(id, pass);

        if (this.authValid.hasError) {
            return;
        }

        this.authService.auth(id, pass)
            .subscribe(_ => {
                this.router.navigate(['/']);
            }, (err: HttpErrorResponse) => {
                this.msg = 'IDもしくはパスワードが正しくありません。';
            });
    }

}
