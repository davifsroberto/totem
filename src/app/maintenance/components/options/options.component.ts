import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';

import { TotemOptions } from '@app/shared/models/options.enum';
import { TotemAccess } from '@app/access/models/totem-access.model';
import { Option } from '@app/maintenance/models/option.model';
import { MaintenanceService } from '@app/maintenance/services/maintenance.service';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class MaintenanceOptionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  options: Option[];
  access: TotemAccess;
  user: User;
  spinner: boolean = false;
  userFirstName: string;
  attendanceId: number | null;

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    protected notifierService: NotifierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOptions();
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('mottu-totem.user');

    if (user == null) {
      this.notifierService.notify(
        'error',
        'Não foi possível encontrar o usuário!'
      );
      return;
    }

    this.user = JSON.parse(user);
    const names = this.user.nome.split(' ');
    this.userFirstName = names[0];
  }

  getOptions(): void {
    this.spinner = true;

    const access = localStorage.getItem('mottu-totem.access');
    const attendanceId = this.route.snapshot.paramMap.get('attendanceId?');
    this.attendanceId = Number(attendanceId) || null;

    if (access == null) {
      this.notifierService.notify(
        'error',
        'Não foi possível encontrar as informações de acesso do totem!'
      );
      return;
    }

    this.access = JSON.parse(access);
    this.subscription.add(
      this.maintenanceService
        .getOptions(this.access.totemOpcaoId, this.access.lugarId)
        .subscribe({
          next: (response) => {
            this.options = response.filter((option) => {
              if (option.id === TotemOptions.MaintenanceQuick)
                return !option.horarioExpediente.semExpediente;

              return true;
            });

            this.spinner = false;
          },
          error: (error) => {
            this.notifierService.notify('error', error);
            this.spinner = false;
          }
        })
    );
  }

  backToStart(): void {
    this.router.navigateByUrl('maintenance');
  }

  checkSchedule(option: Option): void {
    this.spinner = true;

    this.subscription.add(
      this.maintenanceService
        .getSchedule(this.user.usuarioId, option.id, this.access.lugarId)
        .subscribe({
          next: (response) => {
            if (response) {
              if (this.attendanceId == null)
                this.router.navigateByUrl(
                  `maintenance/confirm-option/${option.id}/${option.descricao}/`
                );
              else
                this.router.navigateByUrl(
                  `maintenance/confirm-option/${option.id}/${option.descricao}/${this.attendanceId}`
                );
            } else this.router.navigateByUrl('maintenance/schedule');

            this.spinner = false;
          },
          error: (error) => {
            this.notifierService.notify('error', error);
            this.spinner = false;
          }
        })
    );
  }

  navigateToOptions(option: Option): void {
    if (option.id === TotemOptions.MaintenanceQuick) {
      if (this.attendanceId == null)
        this.router.navigateByUrl('maintenance/quick-options/');
      else
        this.router.navigateByUrl(
          `maintenance/quick-options/${this.attendanceId}`
        );
    } else this.checkSchedule(option);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
