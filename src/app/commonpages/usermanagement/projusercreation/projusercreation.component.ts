import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from "@angular/forms";
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-projusercreation',
  templateUrl: './projusercreation.component.html',
  styleUrls: ['./projusercreation.component.scss'],
})
export class ProjusercreationComponent implements OnInit {

  //---Show/Hide---Password--Begin---//
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  errorMSg:any=null;
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  //---Show/Hide---Password--End------------------///

  constructor(private formBuilder: FormBuilder,private modalctrl: ModalController,private api: ApiService,) { }
  ngOnInit() {}
  // PassWord Validation---Start-------//
  // PasswordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {

  //   let value: string = control.value || '';
  //   let msg = "";
  //   if (!value) {
  //     return null
  //   }

  //   let upperCaseCharacters = /[A-Z]+/g;
  //   let lowerCaseCharacters = /[a-z]+/g;
  //   let numberCharacters = /[0-9]+/g;
  //   let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  //   if (upperCaseCharacters.test(value) === false || lowerCaseCharacters.test(value) === false || numberCharacters.test(value) === false || specialCharacters.test(value) === false) {
  //     return {
  //       passwordStrength: 'Password must contain : numbers, lowercase letters, uppercase letters, or special characters.'
  //     }

  //   }
  // }
  ////------------------End----------------------------------------//

//------------------------------Start-----------------------------//
  get name() {
    return this.registrationForm.get("name");
  }

  get username() {
    return this.registrationForm.get("username");
  }

  // get comformationpassword() {
  //   return this.registrationForm.get("comformationpassword");
  // }

  get role() {
    return this.registrationForm.get("role");
  }
  get state() {
    return this.registrationForm.get("state");
  }
  get district() {
    return this.registrationForm.get("district");
  }
  // get email() {
  //   return this.registrationForm.get('email');
  // }
  // get mobile() {
  //   return this.registrationForm.get('mobile');
  // }

  // get address() {
  //   return this.registrationForm.get('address');
  // }

  get department() {
    return this.registrationForm.get('department');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' },
      { type: 'minlength', message: 'Name must be longer than 2 characters' }
    ],


    username: [
      { type: 'required', message: 'UserName is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' },
      { type: 'minlength', message: 'UserName must be longer than 2 characters' }
    ],

    // comformationpassword: [
    //   { type: 'required', message: 'ComformationPassword is required' },
    //   { type: 'maxlength', message: 'ComformationPassword cant be longer than 50 characters' },
    //   { type: 'minlength', message: 'ComformationPassword must be longer than 2 characters' },
    //   { type: 'pattern', message: 'Please enter a valid Password number' }
    // ],

    role: [
      { type: 'required', message: 'work role is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],

    state: [
      { type: 'required', message: 'state is required' },
      { type: 'maxlength', message: 'state cant be longer than 100 characters' }
    ],
    district: [
      { type: 'required', message: 'District is required' },
      { type: 'maxlength', message: 'District cant be longer than 100 characters' }
    ],
    department: [
      { type: 'required', message: 'department is required' }
    ]

    // email: [
    //   { type: 'required', message: 'Email is required' },
    //   { type: 'pattern', message: 'Please enter a valid email address' }
    // ],
    // mobile: [
    //   { type: 'required', message: 'Phone number is required' },

    //   { type: 'maxlength', message: 'PhoneNumber  name cant be longer than 10 digith' },
    //   { type: 'minlength', message: 'PhoneNumber  name cant be smaller than 10 digith' },

    //   { type: 'pattern', message: 'Please enter a valid phone number' }
    // ]
    // address: [
    //   { type: 'required', message: 'Address is required' },
    //   {
    //     type: 'maxlength',
    //     message: 'Address name cant be longer than 200 characters'
    //   }
    // ]
  };

  registrationForm = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.maxLength(50)]],

    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    department: ['', [Validators.required]],

    password: [null, Validators.compose([
      Validators.required, Validators.minLength(3)])],

    // comformationpassword: ['', [
    //   Validators.required,
    //   Validators.minLength(2),
    //   Validators.maxLength(50),
    // ]],

    role: ['', [Validators.required, Validators.maxLength(3)]],

    state: ['', [Validators.required, Validators.maxLength(2)]],
    district: ['', [Validators.required, Validators.maxLength(3)]]

    // email: [
    //   '',
    //   [
    //     Validators.required,
    //     Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$")

    //   ]
    // ],

    // mobile: [
    //   '',
    //   [
    //     Validators.required,
    //     Validators.minLength(10), Validators.maxLength(10),
    //     Validators.pattern('^[+]*[(]{0,1}[6-9]{1,4}[)]{0,1}[-s./0-9]*$')
    //   ]
    // ],

    // address: [
    //   '',
    //   [Validators.required, Validators.maxLength(100)]
    // ]

  }
  // , {
  //   validator: this.ConfirmedValidator('password', 'comformationpassword')
  // }
  );

  // ConfirmedValidator(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];
  //     if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
  //       return;
  //     }
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ confirmedValidator: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   }
  // }

  get f() {
    return this.registrationForm.controls;
  }
//------------------------------END-----------------------------//

  public submit() {
    console.log(this.registrationForm.value);

    let postDate = {
      mode: 'addAllUser',
      user: this.registrationForm.value,
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log("User Added sucessfully");
        //this.modalctrl.dismiss(true);
      }
    });
  }


  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

}
