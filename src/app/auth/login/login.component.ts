import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup;


  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(){
    this.loginForm=new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  login(){
    if(this.loginForm.valid){
      const {email,password}=this.loginForm.value;
      console.log(this.loginForm.value);
      const succes= this.authService.login(email,password);
      if(succes){
        this.router.navigate(['/home']);
      }
      else{
        alert("email and password are incorrect");
      }
    }
  }

  onLogin(){
    this.router.navigate(['/home']);
  }

}
