import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaintenanceStartComponent } from './components/start/start.component';
import { MaintenanceAppComponent } from './maintenance.app.component';
import { MaintenanceOptionsComponent } from './components/options/options.component';
import { MaintenanceConfirmOptionComponent } from './components/confirm-option/confirm-option.component';
import { MaintenanceComfirmedOptionComponent } from './components/confirmed-option/confirmed-option.component';
import { MaintenanceQuickOptionComponent } from './components/quick-option/quick-option.component';
import { MaintenanceScheduleComponent } from './components/schedule/schedule.component';
import { MaintenanceOpenOptionComponent } from './components/open-option/open-option.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceAppComponent,

    children: [
      {
        path: '',
        component: MaintenanceStartComponent
      },
      {
        path: 'options/:attendanceId?',
        component: MaintenanceOptionsComponent
      },
      {
        path: 'confirm-option/:optionId/:optionDescription/:attendanceId?',
        component: MaintenanceConfirmOptionComponent
      },
      {
        path: 'confirmed-option',
        component: MaintenanceComfirmedOptionComponent
      },
      {
        path: 'quick-options/:attendanceId?',
        component: MaintenanceQuickOptionComponent
      },
      {
        path: 'schedule',
        component: MaintenanceScheduleComponent
      },
      {
        path: 'open-option/:optionId/:optionDescription',
        component: MaintenanceOpenOptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule {}
