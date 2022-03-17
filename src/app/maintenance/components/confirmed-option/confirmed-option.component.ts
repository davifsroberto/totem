import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './confirmed-option.component.html',
  styleUrls: ['./confirmed-option.component.scss']
})
export class MaintenanceComfirmedOptionComponent implements OnDestroy {
  timeout: any;

  constructor(private router: Router) {
    this.timeout = setTimeout(() => {
      this.backToStart();
    }, 10000);
  }

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
}
