import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Bill} from '../models/bill.model';

@Injectable()
export class BillService {
  constructor(private http: HttpClient) {}

  getBill() {
    return this.http.get<Bill>('http://localhost:3000/bill');
  }

  getCurrency(symbols: string = 'RUB, USD, CAD') {
    const param = new HttpParams().set('symbols', symbols).set('access_key', '5a1c025ad6676a70dd0677a0a951a459');
    return this.http.get<any>('http://data.fixer.io/api/latest', {params: param})
  }
}
