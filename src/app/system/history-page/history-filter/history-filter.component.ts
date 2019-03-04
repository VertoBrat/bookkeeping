import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'pht-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Input() categories: Category[] = [];

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() inFilterApply = new EventEmitter<any>();

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriod = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor() { }

  ngOnInit() {
  }

  onCancel() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.onFilterCancel.emit();
  }

  applyFilter() {
    this.inFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  private calcInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter((t) => t !== value);
    }

  }

  handleChangeType({checked, value}) {
    this.calcInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calcInputParams('selectedCategories', checked, value);
  }

}
