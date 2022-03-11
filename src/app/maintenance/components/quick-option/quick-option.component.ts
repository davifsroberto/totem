import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-option',
  templateUrl: './quick-option.component.html',
  styleUrls: ['./quick-option.component.scss']
})
export class MaintenanceQuickOptionComponent {
  constructor(private router: Router) {}

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }

  goToConfirmOption(): void {
    this.router.navigateByUrl('maintenance/confirm-option');
  }
}
