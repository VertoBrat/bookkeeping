import {animate, style, transition, trigger} from '@angular/animations';

export const fadeStateTrigger = trigger('fadeTrigger', [
  transition(':enter', [style({
    opacity: 0
  }), animate(1000, style({
    opacity: 1
  }))]),
  transition(':leave', animate(1000, style({
    opacity: 0
  })))
]);
