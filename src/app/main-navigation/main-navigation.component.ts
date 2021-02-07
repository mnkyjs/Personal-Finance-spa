import {Component, OnInit} from '@angular/core';
import {CategorieDto, FinanceApiService} from '../api/service/personal-finance-api.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  result: CategorieDto[] = [] as CategorieDto[];
  userName = 'du...';

  constructor(private finService: FinanceApiService, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.finService.getAllCategories().subscribe((res) => {
      this.result = res;
    });
    this.userName = this.auth.getUserName();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
