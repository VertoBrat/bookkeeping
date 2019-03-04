import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoryService} from '../../../shared/services/category.service';
import {PHTEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pht-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: PHTEvent;
  category: Category;
  isLoaded = false;
  s1:Subscription;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.s1 = this.route.params
      .mergeMap((params:Params) => this.eventsService.getEventById(params['id']))
      .mergeMap((event: PHTEvent) => {
        this.event = event;
        return this.categoryService.getCategoryById(event.category);
      })
      .subscribe((cat: Category) => {
        this.category = cat;
        this.isLoaded = true;
      })
  }

  ngOnDestroy(): void {
    if (this.s1) this.s1.unsubscribe();
  }

}
