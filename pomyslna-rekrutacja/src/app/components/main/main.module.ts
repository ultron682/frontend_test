import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './container/main-container/main-container.component';
import { MainDescriptionComponent } from './presenter/main-description/main-description.component';
import { MainOptionsComponent } from './presenter/main-options/main-options.component';
import { MainToolsComponent } from './presenter/main-tools/main-tools.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainContainerComponent, MainDescriptionComponent, MainOptionsComponent, MainToolsComponent],
  exports: [MainContainerComponent]
})
export class MainModule { }
