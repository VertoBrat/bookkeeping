import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';


@Injectable()
export class UsersService extends BaseApi{
  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(params:HttpParams) {
    return this.get<User>('users', params);
  }

  createNewUser(user: User) {
    return this.post<User>('users', user);
  }

}
