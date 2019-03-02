import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Message} from '../../../shared/models/message.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../../../shared/services/category.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pht-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  message: Message;
  form: FormGroup;
  sub1: Subscription;
  sub2: Subscription;

  @Input('categories') categories: Category[];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  @Output() onCategoryDeleted = new EventEmitter<number>();

  currentCategory: Category = {name: '', capacity: 0};

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.message = new Message('success', '');
    this.form = new FormGroup({
      'select': new FormControl(''),
      'name': new FormControl('', [Validators.required]),
      'limit': new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  onSubmit() {
    const editCategory = new Category(
      this.form.get('name').value,
      this.form.get('limit').value,
      this.currentCategory.id
    );
    this.sub1 = this.categoryService.editCategory(editCategory, editCategory.id)
      .subscribe((c: Category) => {
        this.onCategoryEdit.emit(c);
        this.showMessage({text: 'Категория изменена', type: 'success'});
      });
  }

  onCategoryChange() {
    if (this.form.get('select').value) {
      this.currentCategory = this.form.get('select').value;
    }
  }

  deleteCategory() {
    this.sub2 = this.categoryService.deleteCategory(this.currentCategory.id)
      .subscribe(() => {
          this.onCategoryDeleted.emit(this.currentCategory.id);
          this.form.reset();
          this.showMessage({text: 'Категория удалена', type: 'danger'});
        }
      );
  }

  private showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 2500);
  }

  ngOnDestroy(): void {
    this.sub1 ? this.sub1.unsubscribe() : null;
    this.sub2 ? this.sub2.unsubscribe() : null;
  }

}
