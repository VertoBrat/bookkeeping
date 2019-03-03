import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pht-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {

  @Input() data;

}
