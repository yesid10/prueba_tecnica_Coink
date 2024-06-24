import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Network } from '@capacitor/network';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/ingreso'])
    }, 3000);

  }
  ionViewWillEnter(){
    setTimeout(() => {
      this.router.navigate(['/ingreso'])
    }, 3000);
  }
}