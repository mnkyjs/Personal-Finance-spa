import { Component, OnInit } from '@angular/core';
import {CategorieDto, FinanceApiService} from "../../../shared/api/service/personal-finance-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  result: CategorieDto[] = [] as CategorieDto[];
  isCollapsed = true;

  constructor(private finService: FinanceApiService, private router: Router) {}

  ngOnInit(): void {
    this.finService.getAllCategories().subscribe((res) => {
      this.result = res;
    });
  }
  toogleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
