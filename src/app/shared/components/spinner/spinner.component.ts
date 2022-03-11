import { Component, OnDestroy } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  template: `
    <ngx-spinner
      bdColor="rgb(68 67 67 / 85%)"
      size="medium"
      color="#00b131"
      type="square-loader"
      size="large"
      [fullScreen]="true"
    >
      <br />
      <strong style="color: #00b131; font-size: 1.6em">Processando...</strong>
    </ngx-spinner>
  `
})
export class SpinnerComponent implements OnDestroy {
  constructor(private spinner: NgxSpinnerService) {
    this.spinner.show();
  }

  ngOnDestroy(): void {
    this.spinner.hide();
  }
}
