import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './confirmed-option.component.html',
  styleUrls: ['./confirmed-option.component.scss']
})
export class MaintenanceComfirmedOptionComponent {
  constructor(private router: Router) {}

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }
}
