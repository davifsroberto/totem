import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class MaintenanceScheduleComponent {
  constructor(private router: Router) {}

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }
}
