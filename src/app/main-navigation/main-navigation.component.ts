import {Component, OnInit} from '@angular/core';
import {CategorieDto, FinanceApiService} from '../api/service/personal-finance-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  result: CategorieDto[] = [] as CategorieDto[];

  constructor(private finService: FinanceApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.finService.getAllCategories().subscribe((res) => {
      this.result = res;
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
