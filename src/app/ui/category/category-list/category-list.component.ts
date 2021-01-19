import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CategorieDto,
  FinanceApiService,
} from '../../../shared/api/service/personal-finance-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../shared/components/dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'share', 'commands'];
  dataSource: CategorieDto[];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private apiService: FinanceApiService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe((res) => {
      if (res) {
        this.dataSource = res;
      }
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  // TODO add userId to category
  addRowData(row_obj) {
    const category = row_obj as CategorieDto;
    category.userId = this.authService.decodedToken.nameid;
    this.dataSource.push(category);
    this.apiService.postCategory(category).subscribe((value) => {
      if (value) {
        this.table.renderRows();
      }
    });
  }

  updateRowData(row_obj) {
    console.log(row_obj);
    this.apiService.putCategory(row_obj.id, row_obj).subscribe((value) => {
      if (value) {
        this.dataSource = this.dataSource.filter((value, key) => {
          if (value.id == row_obj.id) {
            value.name = row_obj.name;
            value.isShared = row_obj.isShared;
          }
          return true;
        });
      }
    });
  }

  deleteRowData(row_obj) {
    this.apiService.deleteCategory(row_obj).subscribe((value) => {});
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }
}
