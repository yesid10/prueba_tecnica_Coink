import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonInput } from '@ionic/angular/standalone';
import { NavigationMenuComponent } from '../Components/navigation-menu/navigation-menu.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.page.html',
  styleUrls: ['./telefono.page.scss'],
  standalone: true,
  imports: [IonInput, 
    IonIcon, 
    IonButtons, 
    IonButton, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    NavigationMenuComponent,
    RouterLink
  ]
})

export class TelefonoPage implements OnInit {

  phoneNumber: string = '';
  isPhoneNumberValid: boolean = false;
  

  numbers=[
    {
      id: 1,
      value: 1
    },
    {
      id: 2,
      value: 2
    },
    {
      id: 3,
      value: 3
    },
    {
      id: 4,
      value: 4
    },
    {
      id: 5,
      value: 5
    },
    {
      id: 6,
      value: 6
    },
    {
      id: 7,
      value: 7
    },
    {
      id: 8,
      value: 8
    },
    {
      id: 9,
      value: 9
    },
    
  ]

  constructor(private route: Router) { }

  ngOnInit() {
  }

  addNumber(num: number){
    if(this.phoneNumber.length < 10){
      this.phoneNumber += num;
      this.validatePhoneNumber();
    }
  }
  deleteNumber() {
    this.phoneNumber = this.phoneNumber.slice(0, -1);
    this.validatePhoneNumber();
  }

  submitNumber() {
    this.validatePhoneNumber();
    if(this.isPhoneNumberValid){
      console.log('Número de teléfono ingresado:', this.phoneNumber);
      this.phoneNumber = '';
      this.isPhoneNumberValid = false;
      this.route.navigate(['/register'])
    }else{
      console.log('Número de teléfono no válido');
    }
  }

  validatePhoneNumber(){
    this.isPhoneNumberValid = this.phoneNumber.length === 10 && 
    this.phoneNumber.trim().length > 0;
  }
}
