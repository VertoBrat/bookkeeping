import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'pht-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  minPas: number = 6;
  message: Message;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title) {
    title.setTitle('Вход в систему')
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogIn']) {
        this.showMessage({text: 'Теперь можете зайти в систему', type: 'success'});
      } else if (params['accessDenied']) {
          this.showMessage({text:'Для доступа требуется авторизация!', type: 'danger'})
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(this.minPas)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 4000);
  }

  onSubmit() {
    const formData = this.form.value;
    const params = new HttpParams().set('email', formData.email);
    this.usersService.getUserByEmail(params)
      .subscribe((user: User) => {
        if (user[0]) {
          if (user[0].password === formData.password) {
            this.message.text = '';
            localStorage.setItem('user', JSON.stringify(user[0]));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage(
              {
                text: 'Неправильный пароль',
                type: 'danger'
              });
          }
        } else {
          this.showMessage({
            text: 'Нет такого пользователя',
            type: 'danger'
          });
        }
      });
  }
}
