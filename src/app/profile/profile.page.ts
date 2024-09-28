import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAnnoncePage } from '../create-annonce/create-annonce.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  inscritForm: FormGroup;

  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',

  };


  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private modalController: ModalController
  ) {
    this.inscritForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

  }

  user: any = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  }

  ngOnInit() {
    this.loadUser();


    console.log('!!!', this.inscritForm)
  }





  loadUser() {
    this.userService.getCurrentUser().subscribe({
      next: response => {
        this.user = response;

        this.inscritForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phone: this.user.phone,
          email: this.user.email
        });
        console.log("userr", this.user)
      },
      error: error => {
        console.error("errrrror", error)
      }
    })
  }

  updateError: string | null = null;


  update() {

    const updatedUserData = {
      firstName: this.inscritForm.get('firstName')?.value,
      lastName: this.inscritForm.get('lastName')?.value,
      email: this.inscritForm.get('email')?.value,
      phone: this.inscritForm.get('phone')?.value

    };

    this.userService.createUser(updatedUserData).subscribe({

      next: response => {
        console.log('user update successfully.', response);

        window.location.reload();
      },
      error: error => {
        console.log(' successfully.', this.formData.firstName);

        console.error('Erreur d\'inscription :', error);
        this.updateError = 'une erreur s\'est produite lors de la inscription. Veuillez réessayer ultérieurement.';
      }
    });

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


}
