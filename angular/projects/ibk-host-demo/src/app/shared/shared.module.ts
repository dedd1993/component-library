import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IbkStyleGuideModule } from '../ibk-style-guide/ibk-style-guide.module';

import {
  FormatMoneyDirective,
  OnlyObjectNameDirective,
  OnlyCharactersDirective,
  OnlyDigitsDirective,
  OnlyAlphanumericDirective,
  OnlyOrganizationNameDirective,
  OnlyAddressDirective
} from './directives';

const COMPONENTS = [];

const DIRECTIVES = [
  FormatMoneyDirective,
  OnlyAlphanumericDirective,
  OnlyCharactersDirective,
  OnlyDigitsDirective,
  OnlyObjectNameDirective,
  OnlyOrganizationNameDirective,
  OnlyAddressDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IbkStyleGuideModule,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  providers: []
})
export class SharedModule { }
