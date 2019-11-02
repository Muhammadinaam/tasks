import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldValidationComponent } from './field-validation/field-validation.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [FieldValidationComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule
  ],
  exports: [
    FieldValidationComponent,
    DataTablesModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule
  ]
})
export class CommonComponentsModule { }
