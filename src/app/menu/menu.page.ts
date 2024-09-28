import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAcceuil() {
    // Implémentez la navigation vers la page d'accueil
    this.router.navigate(['/acceuil']);
  }

  goToGestionAnnonces() {
    // Implémentez la navigation vers la page de gestion des annonces
    this.router.navigate(['/gestion-annonces']);
  }

  logout() {
    // Implémentez la logique de déconnexion (par exemple, supprimez le jeton d'authentification)
    // Une fois déconnecté, redirigez vers la page de connexion ou une autre page appropriée
    this.router.navigate(['/login']);
  }



}
