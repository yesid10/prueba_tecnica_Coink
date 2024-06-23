import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class NavigationMenuComponent  implements OnInit {
  @Input() currentPage!: 'telefono' | 'registro' | 'contrato';

  constructor() { }

  ngOnInit() {}



}
