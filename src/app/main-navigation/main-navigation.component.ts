import { Component, OnInit } from '@angular/core';
import { CategorieDto, FinanceApiService } from '../api/service/personal-finance-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent implements OnInit {
    result: CategorieDto[] = [] as CategorieDto[];
    userName = 'du...';

    constructor(
        private _financeApiService: FinanceApiService,
        private _router: Router,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this._financeApiService.getAllCategories().subscribe((res) => {
            this.result = res;
        });
        this.userName = this._authService.getUserName();
    }

    logout(): void {
        localStorage.removeItem('token');
        this._router.navigate(['/login']);
    }
}
