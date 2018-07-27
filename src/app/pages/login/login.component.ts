import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    msg = '';
    msgId = '';
    msgPass = '';

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    login(id: string, pass: string): void {
        this.msgId = id ? '' : 'IDを入力して下さい。';
        this.msgPass = pass ? '' : 'パスワードを入力して下さい。';

        if (!id || !pass) {
            return;
        }

        this.authService.auth(id, pass)
            .subscribe(_ => {
                this.msg = 'ログインしました。';
            }, (err: HttpErrorResponse) => {
                this.msg = 'IDもしくはパスワードが正しくありません。';
            });
    }

}
