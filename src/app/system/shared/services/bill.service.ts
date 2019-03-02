import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Bill} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';
import {Observable} from 'rxjs';

@Injectable()
export class BillService extends BaseApi{
  constructor(public http: HttpClient) {
    super(http);
  }

  /*getBill() {
    return this.http.get<Bill>('http://localhost:3000/bill');
  }*/

  getBill(): Observable<Bill> {
   return this.get<Bill>('bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put<Bill>(bill,'bill');
  }

  getCurrency(symbols: string = 'RUB, USD, CAD') {
    const param = new HttpParams().set('symbols', symbols).set('access_key', '5a1c025ad6676a70dd0677a0a951a459');
    return this.http.get<any>('http://data.fixer.io/api/latest', {params: param})
  }
}
