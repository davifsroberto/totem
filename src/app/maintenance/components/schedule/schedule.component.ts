import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class MaintenanceScheduleComponent implements OnDestroy {
  timeout: any;

  constructor(private router: Router) {
    this.timeout = setTimeout(() => {
      this.backToStart();
    }, 30000);
  }

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
}
