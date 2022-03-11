import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class MaintenanceOptionsComponent {
  constructor(private router: Router) {}

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }

  goToQuickOptions(): void {
    this.router.navigateByUrl('maintenance/quick-options');
  }

  goToConfirmOption(): void {
    this.router.navigateByUrl('maintenance/confirm-option');
  }
}
