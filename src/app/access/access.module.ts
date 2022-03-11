import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '@app/shared/shared.module';
import { AccessComponent } from './access.component';
import { AccessRoutingModule } from './access.routing.module';
import { AccessService } from './services/access.service';

@NgModule({
  declarations: [AccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccessRoutingModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [AccessService]
})
export class AccessModule {}
