import { NgModule } from '@angular/core';
import { IbkComponentLibraryComponent } from './ibk-component-library.component';

import {
  IbkInputDirective,
  SelectDirective
 } from './directives';

const DIRECTIVES = [
  IbkInputDirective,
  SelectDirective
];

@NgModule({
  declarations: [
    ...DIRECTIVES,
    IbkComponentLibraryComponent
  ],
  imports: [],
  exports: [
    ...DIRECTIVES,
    IbkComponentLibraryComponent
  ]
})
export class IbkComponentLibraryModule { }
