import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './container/main-container/main-container.component';
import { MainDescriptionComponent } from './presenter/main-description/main-description.component';
import { MainOptionsComponent } from './presenter/main-options/main-options.component';
import { MainToolsComponent } from './presenter/main-tools/main-tools.component';
import { MainContentService } from './services/main-content.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowSortPipe } from '../../shared/pipes/articlesSortPipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MainContainerComponent, MainDescriptionComponent, MainOptionsComponent, MainToolsComponent, RowSortPipe],
  exports: [MainContainerComponent],
  providers: [MainContentService]
})
export class MainModule { }
