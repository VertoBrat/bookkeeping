import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {User} from '../models/user.model';


@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(params:HttpParams) {
    return this.http.get<User>('http://localhost:3000/users', {params: params});
  }

  createNewUser(user: User) {
    return this.http.post<User>('http://localhost:3000/users', user);
  }

}
