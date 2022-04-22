import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({

  declarations: [
  ],

  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  exports: [
    TranslateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
})

export class SharedModule {

  static forRoot() {
    return {
      ngModule: SharedModule,
    };
  }
}