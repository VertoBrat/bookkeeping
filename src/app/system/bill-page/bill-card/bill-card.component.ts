import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import {Observable} from 'rxjs/observable';
import {Subscription} from 'rxjs';
import 'rxjs/rx';

@Component({
  selector: 'pht-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  bill: Bill;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.bill = new Bill(0, 'RUB');
   this.subscription = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any])=>{
      this.bill.value = data[0].value;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
