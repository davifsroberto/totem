import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-option',
  templateUrl: './open-option.component.html',
  styleUrls: ['./open-option.component.scss']
})
export class MaintenanceOpenOptionComponent {
  constructor(private router: Router) {}

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }

  goToOptions(): void {
    this.router.navigateByUrl('maintenance/options');
  }
}
