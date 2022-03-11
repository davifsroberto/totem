import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-option',
  templateUrl: './confirm-option.component.html',
  styleUrls: ['./confirm-option.component.scss']
})
export class MaintenanceConfirmOptionComponent {
  constructor(private router: Router) {}

  backToOptions(): void {
    this.router.navigateByUrl('maintenance/options');
  }

  goToConfirmedOption(): void {
    this.router.navigateByUrl('maintenance/confirmed-option');
  }
}
