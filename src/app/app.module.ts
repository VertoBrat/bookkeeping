import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {HttpModule} from '@angular/http';
import {UsersService} from './shared/services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {SystemModule} from './system/system.module';
import {CategoryService} from './shared/services/category.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    SystemModule
  ],
  providers: [UsersService, AuthService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
