import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { Router } from '@angular/router';
import { CreateAnnoncePage } from '../create-annonce/create-annonce.page';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.page.html',
  styleUrls: ['./gestion-annonces.page.scss'],
})
export class GestionAnnoncesPage implements OnInit {

  userAnnonces: any[] = [
  ];

  modificationForm: FormGroup;


  constructor(
    private annonceService: AnnonceService,
    private router: Router,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.modificationForm = this.formBuilder.group({
      nouveauTitre: ['', Validators.required],
      nouvelleDescription: ['', Validators.required],
    });
  }

  modifierAnnonce(annonce: any) {
    const nouvellesValeurs = this.modificationForm.value;


    console.log('Modifications enregistrées avec succès', nouvellesValeurs);

  }

  ngOnInit() {
    this.loadUserAnnonces();
  }

  loadUserAnnonces(): void {
    this.annonceService.getAnnonceByUser().subscribe((response) => {
      if (typeof response === 'object' && response !== null) {
        this.userAnnonces = Object.values(response);
      } else {
        this.userAnnonces = [];
      }
    });
  }









  goToAcceuil() {
    this.router.navigate(['/accueil']);
  }

  goToGestionAnnonces() {
    this.router.navigate(['/gestion-annonces']);
  }

  logout() {
    this.router.navigate(['/login']);
  }





  async ajouterAnnonce() {
    const modal = await this.modalController.create({
      component: CreateAnnoncePage, // Le composant de la modale
      componentProps: {} // Propriétés à passer à la modale (si nécessaire)
    });

    await modal.present();
  }

  async ouvrirModalAjoutAnnonce() {
    const modal = await this.modalController.create({
      component: CreateAnnoncePage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // Les données d'annonce ont été renvoyées depuis la modale.
        // Vous pouvez les utiliser ici, par exemple, les ajouter à votre liste d'annonces.
        console.log('Données de l\'annonce :', data.data);


      }
    });

    await modal.present();
  }



  annonceEnEdition: any | null = null;
  annonces: any[] = [
    // Vos annonces ici
  ];

  // ...

  annonceOrigin: any | null = null;


  editerAnnonce(annonce: any) {

    console.log("111111111111");
    console.log(annonce);

    this.annonceOrigin = { ...annonce };
    this.annonceEnEdition = { ...annonce };



  }


  commencerEdition(annonce: any) {

    this.annonceOrigin = { ...annonce };

    this.annonceEnEdition = annonce;
  }


  annulerEdition() {
    console.log("2222222222222");
    if (this.annonceOrigin) {
      // Rétablissez les valeurs originales de l'annonce
      this.annonceEnEdition.post.title = this.annonceOrigin.post.title;
      this.annonceEnEdition.post.content = this.annonceOrigin.post.content;
      this.annonceEnEdition = null; // Sortez du mode d'édition
    }
    this.annonceOrigin = null;
  }

  sauvegarderEdition() {
    console.log("33333333");
    if (this.annonceEnEdition) {
      // Mettez à jour les données de l'annonce et sauvegardez-les
      // Puis annulez le mode d'édition
      console.log("4444444444");
      this.annonceEnEdition = null;
    }
  }

  enregistrerModification(annonce: any) {
    // Enregistrez les modifications de l'annonce
    // Par exemple, mettez à jour les données dans votre service ou tableau d'annonces
    this.annonceEnEdition = null; // Sortez du mode édition
  }


  supprimerAnnonce(annonce: any) {
    console.log('supppppp de l\'annonce :', annonce);
    this.annonceService.deleteAnnonce(annonce._id).subscribe({
      next: response => {


        this.loadUserAnnonces();


        console.log('suppp avec succes')

      },
      error: error => {

        console.error('errreuuuuur')

      }
    });
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
