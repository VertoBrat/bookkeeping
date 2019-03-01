import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';

import {CategoryService} from '../../../shared/services/category.service';
import {Category} from '../../shared/models/category.model';
import {Router} from '@angular/router';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'pht-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form:FormGroup;
  message: Message;

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.message = new Message('success', '');
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
      .subscribe((c: Category)=> {
        this.form.reset();
        this.showMessage({text: 'Категория добавлена', type: 'success'})
      })
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

  private showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 2500);
  }

}
