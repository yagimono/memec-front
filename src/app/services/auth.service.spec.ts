import {TestBed, inject} from '@angular/core/testing';
import {defer} from 'rxjs/observable/defer';
import {AuthService} from './auth.service';
import {HttpErrorResponse} from '@angular/common/http';

// Subscribeされたときに指定のデータを返却するObservableを生成
function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}

describe('AuthService', () => {
    let httpClientSpy: { put: jasmine.Spy };
    let authService: AuthService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
        authService = new AuthService(<any> httpClientSpy);
        TestBed.configureTestingModule({
            providers: [
                {provide: AuthService, useValue: authService}
            ]
        });
    });

    it('207が返ってきた場合、認証成功', inject([AuthService], (service: AuthService) => {
        const expected: any = [{code: 7, error: 'Authorization Succeeded: AKB Group Shop\nAuthorization Failed: Nihombashira', traces: []}];

        httpClientSpy.put.and.returnValue(asyncData(expected));

        authService.auth('T2015110201', '00000001').subscribe(
            response => expect(response).toEqual(expected, 'expected'),
            fail
        );
        expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    }));

    it('401が返ってきた場合、認証失敗', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 401 error',
            status: 401, statusText: 'Unauthorized'
        });

        httpClientSpy.put.and.returnValue(asyncError(errorResponse));

        authService.auth('T2015110201', '00000000').subscribe(
            heroes => fail('expected an error'),
            error  => expect(error.message).toContain('401 Unauthorized')
        );
    });
});
