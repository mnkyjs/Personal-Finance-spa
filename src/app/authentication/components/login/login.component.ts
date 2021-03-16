import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    hide = true;
    loginForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(): void {
        this._authService.login(this.loginForm.value).subscribe((res) => {
            this._route.queryParams.subscribe((params) => {
                // Defaults to 0 if no query param provided.
                let returnUrl = params.returnUrl || '/';
                const queryParams = {};
                if (returnUrl.indexOf('?') > -1) {
                    const paramString = returnUrl.substring(returnUrl.indexOf('?') + 1, returnUrl.length);
                    const paramArray = paramString.split('&');
                    paramArray.map((item) => {
                        const keyValArr = item.split('=');
                        queryParams[keyValArr[0]] = keyValArr[1];
                    });
                    returnUrl = returnUrl.substring(0, returnUrl.indexOf('?'));
                }
                this._notificationService.showSuccess('Angemeldet!');
                this._router.navigate([returnUrl], { queryParams });
            });
        });
    }
}
