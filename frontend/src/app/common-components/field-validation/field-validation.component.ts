import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-validation',
  templateUrl: './field-validation.component.html',
  styleUrls: ['./field-validation.component.scss']
})
export class FieldValidationComponent implements OnInit {

  @Input()
  formGroupToValidate:FormGroup;

  @Input()
  controlName:string;
  control: any;

  constructor() { }

  ngOnInit() {
    this.control = this.formGroupToValidate.controls[this.controlName];
  }

}
