import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoryService} from '../../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {Observable, Subscription} from 'rxjs';
import {PHTEvent} from '../shared/models/event.model';
import {Bill} from '../shared/models/bill.model';
import 'rxjs/rx';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'pht-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  bill: Bill;
  categories: Category[] = [];
  events: PHTEvent[] = [];
  isLoaded = false;

  sub1: Subscription;

  constructor(private billService: BillService,
              private categoryService: CategoryService,
              private eventsService: EventsService,
              private title: Title) {
    title.setTitle('Планирование')
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], PHTEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryCost(cat: Category): number {
    const catEvent = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvent.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getBarColor(cat: Category): string {
    const percent = this.getPercent(cat);
    if (percent <= 30) {
      return 'success';
    } else {
      if (percent > 30 && percent <= 60) {
        return 'warning';
      }
    }
    return 'danger';
  }

  ngOnDestroy(): void {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
