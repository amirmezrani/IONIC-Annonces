import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionAnnoncesPage } from './gestion-annonces.page';

const routes: Routes = [
  {
    path: '',
    component: GestionAnnoncesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionAnnoncesPageRoutingModule {}
