import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IbkComponentLibraryModule } from '../../../../ibk-component-library/src/lib/ibk-component-library.module';

import {
  FormatMoneyDirective,
  OnlyObjectNameDirective,
  OnlyCharactersDirective,
  OnlyDigitsDirective,
  OnlyAlphanumericDirective,
  OnlyOrganizationNameDirective,
  OnlyAddressDirective
} from './directives';

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
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IbkComponentLibraryModule,
    ...DIRECTIVES,
  ],
  providers: []
})
export class SharedModule { }
