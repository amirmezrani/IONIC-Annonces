import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionAnnoncesPageRoutingModule } from './gestion-annonces-routing.module';

import { GestionAnnoncesPage } from './gestion-annonces.page';
import { RouterModule } from '@angular/router';
import { ExampleComponent } from '../example/example.component';
import { InscriptionPage } from '../inscription/inscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionAnnoncesPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: GestionAnnoncesPage }])
  ],
  declarations: [GestionAnnoncesPage]
})
export class GestionAnnoncesPageModule { }
