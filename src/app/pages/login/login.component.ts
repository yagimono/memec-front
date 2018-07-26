import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    msgId = '';
    msgPass = '';

    constructor() {
    }

    ngOnInit() {
    }

    login(id: string, pass: string): void {
        this.msgId = id ? '' : 'IDを入力して下さい。';
        this.msgPass = pass ? '' : 'パスワードを入力して下さい。';
    }

}
