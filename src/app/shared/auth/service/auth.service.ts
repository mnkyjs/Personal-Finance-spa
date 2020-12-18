import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthUserDto, FinanceApiService, UserLoginDto} from "../../api/service/personal-finance-api.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  decodedToken = {} as any;

  constructor(private apiService: FinanceApiService) {}

  login(model: UserLoginDto) {
    return this.apiService.login(model).pipe(
      map((response: AuthUserDto) => {
        if (response) {
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
        }
      })
    );
  }

  register(model: any) {
    return this.apiService.register(model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
