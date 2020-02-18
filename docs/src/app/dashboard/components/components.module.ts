import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleViewerModule } from 'src/app/shared/components/example-viewer/example-viewer.module';
import { ComponentsComponent } from './components.component';
import { ComponentRoutingModule } from './components.route';

@NgModule({
  declarations: [ComponentsComponent],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    ExampleViewerModule
  ]
})
export class ComponentsModule { }
