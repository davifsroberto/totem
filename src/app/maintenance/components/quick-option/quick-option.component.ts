import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';

import { TotemOptions } from '@app/shared/models/options.enum';
import { TotemAccess } from '@app/access/models/totem-access.model';
import { Option } from '@app/maintenance/models/option.model';
import { MaintenanceService } from '@app/maintenance/services/maintenance.service';

@Component({
  selector: 'app-quick-option',
  templateUrl: './quick-option.component.html',
  styleUrls: ['./quick-option.component.scss']
})
export class MaintenanceQuickOptionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  options: Option[];
  access: TotemAccess;
  spinner: boolean;
  attendanceId: Number | null;

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    protected notifierService: NotifierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOptions();
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
      this.spinner = false;
      return;
    }

    this.access = JSON.parse(access);
    this.subscription.add(
      this.maintenanceService
        .getOptions(TotemOptions.MaintenanceQuick, this.access.lugarId)
        .subscribe({
          next: (response) => {
            this.options = response;
            this.spinner = false;
          },
          error: (error) => {
            this.notifierService.notify('error', error);
            this.spinner = false;
          }
        })
    );
  }

  backToOptions(): void {
    this.router.navigateByUrl('maintenance/options/');
  }

  goToConfirmOption(option: Option): void {
    if (this.attendanceId == null)
      this.router.navigateByUrl(
        `maintenance/confirm-option/${option.id}/${option.descricao}/`
      );
    else
      this.router.navigateByUrl(
        `maintenance/confirm-option/${option.id}/${option.descricao}/${this.attendanceId}`
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
