import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {Observable, Subscription} from 'rxjs';
import {Category} from '../shared/models/category.model';
import {PHTEvent} from '../shared/models/event.model';

@Component({
  selector: 'pht-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: PHTEvent[] = [];
  isLoaded = false;
  chartData = [];
  sub1: Subscription;

  constructor(private categoriesService: CategoryService,
              private eventsServive: EventsService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsServive.getEvents()
    ).subscribe((data: [Category[], PHTEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) this.sub1.unsubscribe();
  }

  private calculateChartData() {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvents = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    })
  }
}
