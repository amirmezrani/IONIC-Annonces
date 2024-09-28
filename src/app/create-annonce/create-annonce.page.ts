import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnnonceService } from '../services/annonce.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.page.html',
  styleUrls: ['./create-annonce.page.scss'],
})
export class CreateAnnoncePage implements OnInit {

  annonceForm: FormGroup;


  constructor(
    private modalController: ModalController,
    private annonceService: AnnonceService,
    private fb: FormBuilder
  ) {
    this.annonceForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  annonce = {
    title: '',
    content: '',
    category: ''


  };

  createError: string | null = null;


  ajouterAnnonce() {

    console.log('Valeur de category avant l\'envoi :', this.annonce.title);

    this.annonceService.createAnnonce(this.annonceForm.value).subscribe({
      next: response => {
        console.log('Annonce ajoutée avec succès', response);
        this.modalController.dismiss(this.annonceForm.value);
      },
      error: error => {
        console.error('Erreur lors de l\'ajout de l\'annonce', error);


        this.createError = 'une erreur s\'est produite lors de la creation. Veuillez réessayer ultérieurement.';
      }
    });



  }



  annuler() {
    this.modalController.dismiss();
  }

}
