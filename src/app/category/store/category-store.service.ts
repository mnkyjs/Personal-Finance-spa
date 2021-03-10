import {Injectable} from '@angular/core';
import {CategorieDto} from '../../api/service/personal-finance-api.service';
import {StateService} from '../../shared/services/state.service';
import {Observable} from 'rxjs';
import {ApiExtensionService} from '../../api/service/api-extension.service';
import {NotificationService} from '../../shared/services/notification.service';

interface CategoryState {
  categories: CategorieDto[];
  isLoading: boolean;
  selectedCategoryId: number;
}

const initState: CategoryState = {
  categories: [],
  isLoading: false,
  selectedCategoryId: undefined,
};

@Injectable({
  providedIn: 'root'
})
export class CategoryStoreService extends StateService<CategoryState> {

  categories$: Observable<CategorieDto[]> = this.select(state => state.categories);

  selectedCategory$: Observable<CategorieDto> = this.select(state => {
    return state.categories.find(item => item.id === state.selectedCategoryId);
  });

  isLoading$: Observable<boolean> = this.select(state => state.isLoading);

  constructor(private _apiService: ApiExtensionService, private _notification: NotificationService) {
    super(initState);
    this.load();
  }

  loading(): void {
    this.setState({isLoading: true});
  }

  resetState(): void {
    this.setState(initState);
  }

  add(entity: CategorieDto): void {
    this._apiService.postCategory(entity).subscribe((data) => {
      if (data) {
        this.setState({categories: [...this.state.categories, data]});
        this._notification.showSuccess('Gespeichert');
      }
    }, error => {
      this._notification.showError(error);
    });
  }

  load(): void {
    this.loading();
    this._apiService.getAllCategories().subscribe(data => {
      if (data) {
        this.setState({categories: data, isLoading: false});
      }
      this.setState({isLoading: false});
    }, error => {
      this._notification.showError(error);
    });
  }

  update(entity: CategorieDto): void {
    this._apiService.putCategory(entity.id, entity).subscribe((data) => {
      if (data) {
        this.setState({
          categories: this.state.categories.map((item) => (item.id === entity.id ? data : item)),
        });
        this._notification.showSuccess('Gespeichert');
      }
    }, error => {
      this._notification.showError(error);
    });
  }

  remove(entity: CategorieDto): void {
    this._apiService.deleteCategory(entity).subscribe(() => {
      this.setState({
        selectedCategoryId: undefined,
        categories: this.state.categories.filter((item) => item.id !== entity.id)
      });
      this._notification.showSuccess('Gespeichert');
    }, error => {
      this._notification.showError(error);
    });
  }
}
