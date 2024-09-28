import { Component, OnInit } from '@angular/core';
import { CreateAnnoncePage } from '../create-annonce/create-annonce.page';
import { ModalController, NavController } from '@ionic/angular';
import { AnnonceService } from '../services/annonce.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {



  constructor(
    private modalController: ModalController,
    private annonceService: AnnonceService,
    private navCtrl: NavController
  ) {


  }

  annonces: any[] = [];

  annonce = {
    post: {

      title: '',
      content: '',
      date: '',
      updated: '',
      category: ''
    },
    user: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    }
  }


  user = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  }


  annonces$: any = [];
  selectedCategory: string = 'all';

  loadAnnonces(): void {
    console.log(':::', this.selectedCategory)

    switch (this.selectedCategory) {
      case 'all':
        console.log(':::', this.selectedCategory)



        this.loadAnnoncesAll();


        break;
      case 'news':
        console.log(':::', this.selectedCategory)

        this.loadAnnoncesNews();
        break;
      case 'sport':
        console.log(':::', this.selectedCategory)

        this.loadAnnoncesSport();
        break;
    }

  }

  loadAnnoncesAll(): void {
    this.annonceService.getAllAnnonces().subscribe((response) => {
      if (typeof response === 'object' && response !== null) {
        this.annonces = Object.values(response);
      } else {
        this.annonces = [];
      }
    });
  }


  loadAnnoncesNews(): void {
    this.annonceService.getAllAnnoncesNews().subscribe((response) => {
      if (typeof response === 'object' && response !== null) {
        this.annonces = Object.values(response);
      } else {
        this.annonces = [];
      }
    });
  }


  loadAnnoncesSport(): void {
    this.annonceService.getAllAnnoncesSport().subscribe((response) => {
      if (typeof response === 'object' && response !== null) {
        this.annonces = Object.values(response);
      } else {
        this.annonces = [];
      }
    });
  }



  ngOnInit() {
    this.loadAnnonces();
  }

  async ajouterAnnonce() {
    const modal = await this.modalController.create({
      component: CreateAnnoncePage,
      componentProps: {}
    });


    await modal.present();

  }

  async ouvrirModalAjoutAnnonce() {
    const modal = await this.modalController.create({
      component: CreateAnnoncePage,
    });



    modal.onDidDismiss().then((data) => {
      console.log('Données de l\'annonce aaaaaaaaaaaaaaaaaaaaaaaaaaa :');

      if (data.data) {

        console.log('Données de l\'annonce :', data.data);

        const nouvelleAnnonce = data.data;
        this.annonces.push(nouvelleAnnonce);
        this.loadAnnonces();


      }
    });

    await modal.present();

  }






  goToAcceuil() {
    this.navCtrl.navigateForward('/accueil');
  }

  goToGestionAnnonces() {
    this.navCtrl.navigateForward('/gestion-annonces');
  }

  logout() {

    this.navCtrl.navigateForward(['/login']);
  }


  formatDateTime(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }




}
