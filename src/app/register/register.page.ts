import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { ApiCoinkService } from '../service/api-coink.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  documentTypes: Array<any> = [];
  genders: Array<any> = [];
  phoneNumber!: '';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private apiCoinkService: ApiCoinkService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private route: ActivatedRoute,
  ) {this.initForm();}

  async ngOnInit() {

    const loading = await this.loadingController.create({
      message: 'Cargando datos...'
    });
    await loading.present();

    this.route.queryParams.subscribe(params =>{
      this.phoneNumber = params['phoneNumber'] || '';
    })

    try {
      const documentTypes = await this.apiCoinkService.getDocumentTypes().toPromise();
      const genders = await this.apiCoinkService.getGenders().toPromise();

      this.documentTypes = documentTypes;
      this.genders = genders;

      console.log('Datos de documentos de identidad:', JSON.stringify(documentTypes));
      console.log('Datos de género:', JSON.stringify(genders));

      this.initForm();
    } catch (error) {
      console.error('Error cargando datos', error);
      await this.presentToast('Error al cargar los datos. Por favor, intenta de nuevo.');
    } finally {
      loading.dismiss();
    }
  }

  initForm() {
    this.registerForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(0),Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
      fechaExpedicion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      confirmarCorreo: ['', [Validators.required, Validators.email]],
      pinSeguridad: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]{4}$')]],
      confirmarPinSeguridad: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]{4}$')]]
    }, {
      validators: [this.mustMatch('correoElectronico', 'confirmarCorreo'), 
                   this.mustMatch('pinSeguridad', 'confirmarPinSeguridad')]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const dataComplete ={
        ...this.registerForm.value,
        NumTelefono: this.phoneNumber
      }
      this.router.navigate(['/contrato']);
      console.log('Datos Usuario: ', dataComplete);
    } else {
      this.markFormGroupTouched(this.registerForm);
      this.presentToast('Por favor, completa todos los campos correctamente.');
    }
  }

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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}