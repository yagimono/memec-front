import {TestBed, inject} from '@angular/core/testing';

import {ValidService} from './valid.service';
import {AuthValid} from '../view-models/auth-valid';

describe('ValidService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ValidService]
        });
    });

    it('id=空, pass=空', inject([ValidService], (service: ValidService) => {
        const result = service.authValid('', '');
        const expected: AuthValid = {
            hasError: true,
            msgForId: 'IDを入力して下さい。',
            msgForPass: 'パスワードを入力して下さい。'
        };
        expect(result).toEqual(expected);
    }));

    it('id!=空, pass=空', inject([ValidService], (service: ValidService) => {
        const result = service.authValid('1234567890', '');
        const expected: AuthValid = {
            hasError: true,
            msgForId: '',
            msgForPass: 'パスワードを入力して下さい。'
        };
        expect(result).toEqual(expected);
    }));

    it('id=空, pass!=空', inject([ValidService], (service: ValidService) => {
        const result = service.authValid('', 'abcdefgh');
        const expected: AuthValid = {
            hasError: true,
            msgForId: 'IDを入力して下さい。',
            msgForPass: ''
        };
        expect(result).toEqual(expected);
    }));

    it('id!=空, pass!=空', inject([ValidService], (service: ValidService) => {
        const result = service.authValid('1234567890', 'abcdefgh');
        const expected: AuthValid = {
            hasError: false,
            msgForId: '',
            msgForPass: ''
        };
        expect(result).toEqual(expected);
    }));
});
