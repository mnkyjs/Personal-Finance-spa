import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.route.queryParams.subscribe((params) => {
        // Defaults to 0 if no query param provided.
        let returnUrl = params.returnUrl || '/';
        const queryParams = {};
        if (returnUrl.indexOf('?') > -1) {
          const paramString = returnUrl.substring(
            returnUrl.indexOf('?') + 1,
            returnUrl.length
          );
          const paramArray = paramString.split('&');
          paramArray.map((item) => {
            const keyValArr = item.split('=');
            queryParams[keyValArr[0]] = keyValArr[1];
          });
          returnUrl = returnUrl.substring(0, returnUrl.indexOf('?'));
        }
        this._alert.success('Angemeldet!');
        this.router.navigate([returnUrl], { queryParams });
      });
    });
  }
}
