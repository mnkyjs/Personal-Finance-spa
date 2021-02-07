import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import {
  AuthUserDto,
  FinanceApiService,
  UserLoginDto, UserRegisterDto,
} from '../../api/service/personal-finance-api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken = {} as any;

  constructor(private apiService: FinanceApiService) {
  }

  login(model: UserLoginDto): Observable<void> {
    return this.apiService.login(model).pipe(
      map((response: AuthUserDto) => {
        if (response) {
          localStorage.setItem('token', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

  getUserName(): string {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token).unique_name;
  }

  register(model: any): Observable<UserRegisterDto> {
    return this.apiService.register(model);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
