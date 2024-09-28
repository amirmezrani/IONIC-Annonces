import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {


  inscriptionForm: FormGroup;

  constructor(private navCtrl: NavController,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder) {
    this.inscriptionForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }


  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',

  };

  onSubmit() {

    this.userService.createUser(this.formData).subscribe({
      next: response => {
        console.log('Patient added successfully.', response);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Erreur d\'inscription :', error);
      }
    });

  }

}
