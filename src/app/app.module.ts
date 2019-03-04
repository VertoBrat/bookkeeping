import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {UsersService} from './shared/services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {SystemModule} from './system/system.module';
import {CategoryService} from './shared/services/category.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [UsersService, AuthService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
