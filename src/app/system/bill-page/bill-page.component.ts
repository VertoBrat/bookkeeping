import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';
import {BillService} from '../shared/services/bill.service';
import 'rxjs/rx';

@Component({
  selector: 'pht-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  currency: any;
  bill: Bill;

  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any])=>{
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    })
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .delay(1500)
      .subscribe((currency: any)=>{
        this.currency = currency;
        this.isLoaded = true;
      })
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
