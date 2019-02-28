import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';

import {CategoryService} from '../../../shared/services/category.service';
import {Category} from '../../shared/models/category.model';
import {Router} from '@angular/router';

@Component({
  selector: 'pht-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form:FormGroup;

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name':new FormControl('',[Validators.required], this.forbiddenName.bind(this)),
      'limit':new FormControl('1', [Validators.required, Validators.min(1)])
    });
  }

  onSubmit() {
    const formData = this.form.value;
    const category: Category = new Category(
      formData.name,
      formData.limit
    );
    this.categoryService.createNewCategory(category)
      .subscribe((c: Category)=> this.router.navigate(['/system', 'records']))
  }

  forbiddenName(control: FormControl): Promise<any> {
    const param = new HttpParams().set('name', control.value);
    return new Promise<any>((resolve)=>{
      this.categoryService.getCategoryByName(param)
        .subscribe((c: Category)=>{
          if (c[0]) {
            resolve({
              'nameIsUsed':true
            })
          } else {
            resolve(null)
          }
        })
    });
  }

}
