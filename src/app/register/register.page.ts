import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiCoinkService } from '../service/api-coink.service';
import { Router, RouterLink } from '@angular/router';
import { IonDatetime } from '@ionic/angular/standalone';
import { NavigationMenuComponent } from '../Components/navigation-menu/navigation-menu.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule, 
    IonicModule,
    ReactiveFormsModule, 
    RouterLink,
    NavigationMenuComponent
  ]
})
export class RegisterPage implements OnInit {


  registerForm!: FormGroup;
  alertButtons = ['Action'];
  documentTypes: Array<any> = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private apiCoinkService: ApiCoinkService
    )
    {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fechaExpedicion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      confirmarCorreo: ['', [Validators.required, Validators.email]],
      pinSeguridad: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]+$')]],
      confirmarPinSeguridad: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]+$')]]
    }, {
      validator: [this.mustMatch('correoElectronico', 'confirmarCorreo'), 
      this.mustMatch('pinSeguridad', 'confirmarPinSeguridad')]
    });



    //Peticion a la api cuando se renderiza la pagina
    this.apiCoinkService.getDocumentTypes().subscribe(data => {
      this.documentTypes = data;
      console.log('Datos de documentos de indentidad',data);
    })
    this.apiCoinkService.getGenders().subscribe(data => {
      console.log( 'Datos de genero',data)
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario válido', this.registerForm.value);
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  // Método para marcar todos los controles como tocados (visited)
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
      return null;
    };
  }

}


