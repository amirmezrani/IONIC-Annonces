import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { CreateAnnoncePage } from '../create-annonce/create-annonce.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    private annonceService: AnnonceService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  searchTerm: string = '';
  searchResults: any = [];
  searching: boolean = false;
  vide: boolean = false;

  // Fonction pour effectuer la recherche
  performSearch() {


    if (!this.searchTerm.trim()) {
      console.log('Champ de recherche vide. Aucune recherche effectuée.');
      this.searchResults = [];
      this.searching = false;
      this.vide = true;
      return;
    }


    this.annonceService.searchAnnonce(this.searchTerm).subscribe({
      next: response => {

        this.searchResults = response;



        if (this.searchResults && this.searchResults.length > 0) {
          console.log('Aucun annonces trouvé.');
          this.searching = false;

        } else {
          console.log('annoncess trouvés :', response);
          this.searching = true;
          this.searchResults = [];

          console.log('searching :', this.searching);


        }

      },
      error: error => {


        console.error(error);
        this.searchResults = [];
        this.searching = true;


      }
    });


    console.log('searching :', this.searching);

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

    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        // Les données d'annonce ont été renvoyées depuis la modale.
        // Vous pouvez les utiliser ici, par exemple, les ajouter à votre liste d'annonces.
        console.log('Données de l\'annonce :', data.data);


      }
    });

    await modal.present();
  }


}
