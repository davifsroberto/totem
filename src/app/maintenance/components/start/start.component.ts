import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class MaintenanceStartComponent {
  constructor(private router: Router) {}

  cpf: string = '';
  spinner: boolean = false;

  nextStep(): void {
    this.router.navigateByUrl('maintenance/options');
  }
}
