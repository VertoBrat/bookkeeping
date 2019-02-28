import {Component, Input} from '@angular/core';

@Component({
  selector: 'pht-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {

  @Input() currency: any;

  currencies: string[] = ['USD', 'EUR'];

  calculate(cur: string): number {
    const rub: number = this.currency.rates['RUB'];
    return cur === 'EUR'? 1/rub : (1/rub)*this.currency.rates[cur];
  }

}


