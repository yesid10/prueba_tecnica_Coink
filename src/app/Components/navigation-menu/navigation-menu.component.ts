import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NavigationMenuComponent  implements OnInit {
  @Input() currentPage!: 'telefono';
  constructor( private router: Router) { }

  ngOnInit() {}

  navigateTo(page: string){
    this.router.navigate([`/${page}`])
  }

}
