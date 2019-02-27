import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';;
import {Http} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(params:HttpParams) {
    return this.http.get<User>('http://localhost:3000/users', {params: params});
  }

}
