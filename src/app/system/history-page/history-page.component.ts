import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {Observable, Subscription} from 'rxjs';
import {Category} from '../shared/models/category.model';
import {PHTEvent} from '../shared/models/event.model';
import * as moment from 'moment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'pht-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: PHTEvent[] = [];
  filteredEvents: PHTEvent[] = [];

  isLoaded = false;
  chartData = [];
  s1: Subscription;
  isFilterVisible = false;
  isFiltered = false;

  constructor(private categoriesService: CategoryService,
              private eventsServive: EventsService,
              private title: Title) {
    title.setTitle('История')
  }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsServive.getEvents()
    ).subscribe((data: [Category[], PHTEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.setFilteredEvents()
      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.s1) this.s1.unsubscribe();
  }

  private calculateChartData() {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvents = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    })
  }

  private setFilteredEvents() {
    this.filteredEvents = this.events.slice();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setFilteredEvents();
    this.calculateChartData();
    this.isFiltered = false;
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setFilteredEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
    this.isFiltered = true;

  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
     this.toggleFilterVisibility(true);
  }

  cancelFilter() {
    this.onFilterCancel();
  }
}
