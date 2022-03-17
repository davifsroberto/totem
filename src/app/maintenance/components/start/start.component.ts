import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';

import { MaintenanceService } from '@app/maintenance/services/maintenance.service';
import { User } from '@app/shared/models/user.model';
import { TotemOptions } from '@app/shared/models/options.enum';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class MaintenanceStartComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  user: User;
  spinner: boolean = false;
  cpf: string = '';

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    protected notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('mottu-totem.user');
  }

  getUser(): void {
    this.spinner = true;

    this.subscription.add(
      this.maintenanceService
        .getUser(this.cpf, TotemOptions.Maintenance)
        .subscribe({
          next: (response) => {
            this.user = response;
            localStorage.setItem('mottu-totem.user', JSON.stringify(this.user));
            this.verifyActiveAttendance();

            this.spinner = false;
          },

          error: (error) => {
            this.notifierService.notify('error', error);

            this.spinner = false;
          }
        })
    );
  }

  verifyActiveAttendance(): void {
    this.subscription.add(
      this.maintenanceService.getActiveAttendance(this.cpf).subscribe({
        next: (response) => {
          if (response == null)
            this.router.navigateByUrl('maintenance/options/');
          else
            this.router.navigateByUrl(
              `maintenance/open-option/${response.id}/${response.totemOpcaoDescricao}`
            );
        },
        error: (error) => {
          this.notifierService.notify('error', error);
          this.router.navigateByUrl('maintenance/options/');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
