import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'pht-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form:FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'name':new FormControl('',[Validators.required], ),
      'limit':new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  onSubmit() {

  }

  forbiddenName(control: FormControl): Promise<any> {

  }

}
