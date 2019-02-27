import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';

@NgModule({
  declarations:[
    SystemComponent
  ],
  imports:[
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ]
})
export class SystemModule {}
