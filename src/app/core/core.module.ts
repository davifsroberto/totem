import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const notifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 15
    },
    vertical: {
      position: 'top',
      distance: 75,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 5
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NotifierModule.withConfig(notifierOptions)
  ],
  exports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NotifierModule
  ]
})
export class CoreModule {}
