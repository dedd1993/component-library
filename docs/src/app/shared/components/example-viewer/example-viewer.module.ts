import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { ExampleViewerComponent } from './example-viewer.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [ExampleViewerComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    CodemirrorModule,
  ],
  exports: [
    ExampleViewerComponent
  ]
})
export class ExampleViewerModule { }
