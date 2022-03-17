import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { NotifierService } from 'angular-notifier';

import { AccessService } from '@app/access/services/access.service';
import { TotemAccess } from './models/totem-access.model';
import { TotemOptions } from '../shared/models/options.enum';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  totem: TotemAccess;
  idTotem: string = '';
  spinner: boolean = false;

  constructor(
    private router: Router,
    private accessService: AccessService,
    protected notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  getAccess(): void {
    this.spinner = true;

    this.subscription.add(
      this.accessService.getAccess(Number(this.idTotem)).subscribe({
        next: (response) => {
          this.totem = response;

          localStorage.setItem(
            'mottu-totem.access',
            JSON.stringify(this.totem)
          );

          this.redirectToOption(response.totemOpcaoId);

          this.spinner = false;
        },

        error: (error) => {
          this.notifierService.notify('error', error);

          this.spinner = false;
        }
      })
    );
  }

  private redirectToOption(totemOpcaoId: number): void {
    switch (totemOpcaoId) {
      case TotemOptions.MotorcyclePickup:
        this.router.navigateByUrl('/motorcycle-pickup');
        break;

      case TotemOptions.MotorcycleReturn:
        this.router.navigateByUrl('/motorcycle-return');
        break;

      case TotemOptions.Maintenance:
        this.router.navigateByUrl('/maintenance');
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
