import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./access/access.module').then((m) => m.AccessModule)
  },

  {
    path: 'maintenance',
    loadChildren: () =>
      import('./maintenance/maintenance.module').then(
        (m) => m.MaintenanceModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
