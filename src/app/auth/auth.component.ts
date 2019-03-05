import {Component, HostBinding} from '@angular/core';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'pht-auth',
  templateUrl: './auth.component.html',
  animations:[fadeStateTrigger]
})
export class AuthComponent {
  @HostBinding('@fadeTrigger') a = true;
}
