import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/models/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pht-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoryService: CategoryService,
              private title: Title) {
    title.setTitle('Создание и изменение')
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      })
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryEdited(category: Category) {
    const idx = this.categories.findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

  categoryDeleted(id: number) {
    const idx = this.categories.findIndex(c => c.id === id);
    this.categories.splice(idx, 1);
  }

}
