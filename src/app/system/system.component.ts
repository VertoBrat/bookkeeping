import {Component, HostBinding} from '@angular/core';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector:'pht-system',
  templateUrl:'./system.component.html',
  animations:[fadeStateTrigger]
})
export class SystemComponent {
  @HostBinding('@fadeTrigger') a = true;
}
