import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import {PHTEvent} from '../../shared/models/event.model';
import * as moment from 'moment';
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pht-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input('categories') categories: Category[];
  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();

  message: Message;

  types = [
    {type: 'income', label: 'доход'},
    {type: 'outcome', label: 'расход'}
  ];

  constructor(private eventService: EventsService,
              private billService: BillService) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    const date = moment().format('DD.MM.YYYY HH:mm:ss');

    const phtEvent = new PHTEvent(
      type, amount, +category, date, description
    );

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.message.text = 'На счету не достаточно средств. Не хватает ' + (amount - bill.value) + ' ' + bill.currency;
            setTimeout(() => {
              this.message.text = '';
            }, 2500);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }
       this.sub2 = this.billService.updateBill({value, currency: bill.currency})
          .mergeMap(()=> this.eventService.postEvent(phtEvent))
          .subscribe(()=> {
            form.reset();
          });
      });
  }

  ngOnDestroy(): void {
    this.sub1 ? this.sub1.unsubscribe() : null;
    this.sub2?this.sub2.unsubscribe() : null;
  }

}
