import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CategorieDto, FinanceApiService,} from '../../../api/service/personal-finance-api.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../../shared/components/dialog-box/dialog-box.component';
import {MatTable} from '@angular/material/table';
import {AuthService} from '../../../shared/services/auth.service';
import {CategoryStoreService} from '../../store/category-store.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'share', 'commands'];
  categories$: Observable<CategorieDto[]> = this._cStore.categories$;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(
    private apiService: FinanceApiService,
    public dialog: MatDialog,
    private authService: AuthService,
    private _cStore: CategoryStoreService
  ) {
  }

  ngOnInit(): void {
  }

  openDialog(action, obj): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  // TODO add userId to category
  addRowData(row_obj): void {
    const category = row_obj as CategorieDto;
    category.userId = this.authService.decodedToken.nameid;
    this._cStore.add(category);
  }

  updateRowData(row_obj): void {
    this._cStore.update(row_obj);
  }

  deleteRowData(row_obj): void {
    this._cStore.remove(row_obj);
  }
}
