import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { NotifierService } from 'angular-notifier';

import { MaintenanceService } from '@app/maintenance/services/maintenance.service';
import { User } from '@app/maintenance/models/user';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class MaintenanceStartComponent {
  subscription: Subscription = new Subscription();
  user: User;
  spinner: boolean = false;
  cpf: string = '';

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    protected notifierService: NotifierService
  ) {}

  getUser() {
    this.spinner = true;

    this.subscription.add(
      this.maintenanceService.getUser(this.cpf).subscribe({
        next: (response) => {
          this.user = response;

          localStorage.setItem('mottu-totem.user', JSON.stringify(this.user));

          this.router.navigateByUrl('maintenance/options');

          this.spinner = false;
        },

        error: (error) => {
          this.notifierService.notify('error', error);

          this.spinner = false;
        }
      })
    );
  }
}
