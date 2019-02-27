import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {HttpParams} from '@angular/common/http';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'pht-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  minPas: number = 6;
  message:Message;

  constructor(private service: UsersService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(this.minPas)])
    })
  }

  private showMessage(text:string, type:string = 'danger') {
    this.message = new Message(type, text);
    setTimeout(()=>{
      this.message.text = '';
    }, 4000);
  }

  onSubmit() {
    const formData = this.form.value;
    const params = new HttpParams().set('email', formData.email);
    this.service.getUserByEmail(params)
      .subscribe((user:User)=>{
        if (user[0]) {
          if (user[0].password === formData.password) {
            //logik
          } else {
            this.showMessage('Неправильный пароль')
          }
        } else {
          this.showMessage('Нет такого пользователя')
        }
      });
  }
}
