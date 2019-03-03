import {Component, Input, OnInit} from '@angular/core';
import {PHTEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'pht-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() events: PHTEvent[] = [];
  @Input() categories: Category[] = [];

  searchValue = '';
  searchPlaceHolder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
  }

  getCategoryName(id: number) {
    const cat: Category = this.categories.filter((c) => c.id === id).pop();
    return cat.name;
  }

  changeCriteria(value: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceHolder = namesMap[value];
    this.searchField = value;
  }

}
