import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './components/header/header.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    HeaderComponent, 
    SidenavListComponent,
    TruncateTextPipe
  ],
  declarations: [SidenavListComponent, HeaderComponent, TruncateTextPipe]
})
export class SharedModule { }
