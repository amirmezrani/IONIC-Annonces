import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private navCtrl: NavController
  ) {

  }

  user: any = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  }

  ngOnInit(

  ) {
    if (localStorage.getItem('token'))
      this.loadUser();
    else
      this.navCtrl.navigateForward('/login')

  }



  loadUser() {
    this.userService.getCurrentUser().subscribe({
      next: response => {
        this.user = response;
        console.log("userr", this.user)
      },
      error: error => {
        console.error("errrrror", error)
      }
    })
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.navCtrl.navigateForward('example/profile');
  }

}
