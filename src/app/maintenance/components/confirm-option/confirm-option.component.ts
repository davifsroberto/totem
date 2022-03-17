import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';

import { MaintenanceService } from '@app/maintenance/services/maintenance.service';
import { CreateAttendanceModel } from '../../models/create-attendance-model';
import { TotemAccess } from '@app/access/models/totem-access.model';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-confirm-option',
  templateUrl: './confirm-option.component.html',
  styleUrls: ['./confirm-option.component.scss']
})
export class MaintenanceConfirmOptionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  optionDescription: string;
  optionId: number;
  user: User;
  access: TotemAccess;
  spinner: boolean = false;
  attendanceId: number | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private maintenanceService: MaintenanceService,
    protected notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.getAcess();
    this.getUser();
    this.getParams();
  }

  getParams(): void {
    const id = this.route.snapshot.paramMap.get('optionId');
    const description = this.route.snapshot.paramMap.get('optionDescription');
    const attendance = this.route.snapshot.paramMap.get('attendanceId?');

    if (id == null || description == null) {
      this.notifierService.notify(
        'error',
        'Não foi possível encontrar algum dos parâmetros!'
      );
      return;
    }

    this.optionId = Number(id);
    this.optionDescription = description;
    this.attendanceId = Number(attendance) || null;
  }

  getUser() {
    const user = localStorage.getItem('mottu-totem.user');

    if (user == null) {
      this.notifierService.notify(
        'error',
        'Não foi possível encontrar o usuário!'
      );
      return;
    }

    this.user = JSON.parse(user);
  }

  getAcess() {
    const access = localStorage.getItem('mottu-totem.access');

    if (access == null) {
      this.notifierService.notify(
        'error',
        'Não foi possível encontrar algum dos parâmetros!'
      );
      return;
    }

    this.access = JSON.parse(access);
  }

  backToOptions(): void {
    this.router.navigateByUrl('maintenance/options/');
  }

  confirmAttendance(): void {
    const model: CreateAttendanceModel = {
      usuarioId: this.user.usuarioId,
      totemOpcaoId: this.optionId,
      lugarId: Number(this.access.lugarId),
      atendimentoId: this.attendanceId
    };

    if (this.attendanceId == null) this.postAttendance(model);
    else this.changeAttendance(model);
  }

  postAttendance(model: CreateAttendanceModel): void {
    this.spinner = true;

    this.subscription.add(
      this.maintenanceService.postAttendance(model).subscribe({
        next: () => {
          this.notifierService.notify(
            'success',
            'Atendimento criado com sucesso!'
          );
          this.router.navigateByUrl('maintenance/confirmed-option');
          this.spinner = false;
        },
        error: (error) => {
          this.notifierService.notify('error', error);
          this.spinner = false;
        }
      })
    );
  }

  changeAttendance(model: CreateAttendanceModel): void {
    this.spinner = true;

    this.subscription.add(
      this.maintenanceService.postChangeAttendance(model).subscribe({
        next: () => {
          this.notifierService.notify(
            'success',
            'Atendimento criado com sucesso!'
          );
          this.router.navigateByUrl('maintenance/confirmed-option');
          this.spinner = false;
        },
        error: (error) => {
          this.notifierService.notify('error', error);
          this.spinner = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
