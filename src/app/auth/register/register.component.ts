import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup;

  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(){
    this.registerForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,this.passwordStrengthValidator(),Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)])

    })
  }


  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasAnyNumber= /[1-9]/.test(value);


      if (!hasUpperCase || !hasLowerCase || !hasAnyNumber) {
        return { passwordStrength: 'Password must contain at least one uppercase and one lowercase letter' };
      }
      return null;
    };
  }
  passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
    if (this.registerForm && control.value !== this.registerForm.controls['password'].value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  register(){
    if(this.registerForm.valid){
      const{email,password}=this.registerForm.value;
      console.log(this.registerForm.value);
      const succes=this.authService.register(email,password)
      if(succes){
        this.router.navigate(['/buyer'])
      }

      else{
        alert('Email already exists');
      }
    }
  }
}
