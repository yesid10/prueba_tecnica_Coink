import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonLabel, IonCheckbox } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule,
    RouterLink
  ]
})


export class FinalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
