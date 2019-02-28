import {Injectable} from '@angular/core';
import {BaseApi} from '../core/base-api';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Category} from '../../system/shared/models/category.model';

@Injectable()
export class CategoryService extends BaseApi{
  constructor(public http: HttpClient) {
    super(http)
  }

  getCategoryByName(param: HttpParams) {
    return this.get<Category>('categories', param);
  }

  createNewCategory(category: Category) {
    return this.post('categories', category);
  }
}
