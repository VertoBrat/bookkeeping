import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'pht-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  minPas: number = 6;

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(this.minPas)]),
      'name': new FormControl(null,[Validators.required]),
      'agree': new FormControl(false,[Validators.requiredTrue])
    });
  }

  onSubmit(){
    const formData = this.form.value;
    const user: User = new User(
      formData.email,
      formData.password,
      formData.name
    );
    this.userService.createNewUser(user)
      .subscribe((user:User)=>this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogIn: true
        }
      }));
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    const param = new HttpParams().set('email', control.value);
    return new Promise<any>((resolve, reject)=>{
      this.userService.getUserByEmail(param)
        .subscribe((user: User)=>{
          if (user[0]) {
            resolve({
              'emailIsUsed':true
            })
          } else {
            resolve(null)
          }
        })
    });
  }

}
