import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlaningPageComponent } from './planing-page/planing-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations:[
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlaningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports:[
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ]
})
export class SystemModule {}
