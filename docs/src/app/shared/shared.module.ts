import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LogoComponent } from './components/logo/logo.component';

const COMPONENTS = [
  SidenavComponent,
  LogoComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PerfectScrollbarModule,
    ...COMPONENTS
  ],
})
export class SharedModule { }
