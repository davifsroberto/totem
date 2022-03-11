import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { MaintenanceAppComponent } from './maintenance.app.component';
import { MaintenanceRoutingModule } from './maintenance.routing.module';
import { MaintenanceStartComponent } from './components/start/start.component';
import { MaintenanceOptionsComponent } from './components/options/options.component';
import { MaintenanceOpenOptionComponent } from './components/open-option/open-option.component';
import { MaintenanceConfirmOptionComponent } from './components/confirm-option/confirm-option.component';
import { MaintenanceScheduleComponent } from './components/schedule/schedule.component';
import { MaintenanceQuickOptionComponent } from './components/quick-option/quick-option.component';
import { MaintenanceComfirmedOptionComponent } from './components/confirmed-option/confirmed-option.component';
import { SharedModule } from '@app/shared/shared.module';
import { MaintenanceService } from './services/maintenance.service';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MaintenanceAppComponent,
    MaintenanceStartComponent,
    MaintenanceOptionsComponent,
    MaintenanceOpenOptionComponent,
    MaintenanceConfirmOptionComponent,
    MaintenanceScheduleComponent,
    MaintenanceQuickOptionComponent,
    MaintenanceComfirmedOptionComponent
  ],
  imports: [
    MaintenanceRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [MaintenanceService]
})
export class MaintenanceModule {}
