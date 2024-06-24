import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Network } from '@capacitor/network';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.checkConnectionAndNavigate();
  }
  ionViewWillEnter(){
    this.checkConnectionAndNavigate();
  }

  
  async checkConnectionAndNavigate() {
    const status = await Network.getStatus();

    if (status.connected) {
      // Si hay conexión, navega a la siguiente página
      this.navCtrl.navigateForward('/ingreso');
    } else {
      // Si no hay conexión, muestra un mensaje de error
      const toast = await this.toastCtrl.create({
        message: 'No hay conexión a internet. Por favor, verifica tu conexión e intenta nuevamente.',
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
    }
  }
}