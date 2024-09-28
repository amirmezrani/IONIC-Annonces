import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginResponse, UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  formulaireActuel: 'login' | 'inscription' = 'login';

  formDatalogin = {
    email: '',
    password: '',
  };

  loginForm: FormGroup;

  inscritForm: FormGroup;


  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.inscritForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginError: string | null = null;

  login() {

    if (this.loginForm.valid) {
      const formDatalogin = this.loginForm.value;
      console.log("*ABC*", formDatalogin)

      console.log("user", this.formDatalogin)
      this.userService.loginUser(formDatalogin).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login successful!', response.accessToken);
          localStorage.setItem('token', response.accessToken);


          this.navCtrl.navigateForward(['/example']);
        },
        error: error => {
          console.log("***", formDatalogin)
          console.error('Erreur de Login :', error);
          this.loginError = 'une erreur s\'est produite lors de la connexion. Veuillez réessayer ultérieurement.';

        }
      });
    }

  }



  ngOnInit() {
  }




  basculerFormulaire() {

    this.formulaireActuel = this.formulaireActuel === 'login' ? 'inscription' : 'login';
  }




  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',

  };

  inscritError: string | null = null;


  inscription() {

    this.userService.createUser(this.inscritForm.value).subscribe({
      next: response => {
        console.log('user added successfully.', response);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Erreur d\'inscription :', error);
        this.inscritError = 'une erreur s\'est produite lors de la inscription. Veuillez réessayer ultérieurement.';
      }
    });

  }

}
