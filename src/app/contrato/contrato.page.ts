import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonInput, IonButtons, IonList, IonCheckbox } from '@ionic/angular/standalone';
import { NavigationMenuComponent } from '../Components/navigation-menu/navigation-menu.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonList, IonButtons, 
    IonInput, 
    IonIcon, 
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
export class ContratoPage implements OnInit {

  checkedInput: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  onChangeCheckInput(){
    this.checkedInput =!this.checkedInput;
  }

}
