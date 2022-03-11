import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SpinnerComponent } from './components/spinner/spinner.component';

const maskConfig: Partial<IConfig> = {
  validation: false
};

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(maskConfig),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [NgxMaskModule, FormsModule, ReactiveFormsModule, SpinnerComponent]
})
export class SharedModule {}
