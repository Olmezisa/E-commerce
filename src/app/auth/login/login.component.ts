import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import {
  SocialAuthService,
  SocialUser,
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loadingGoogle = false;
  loadingFacebook = false;

  constructor(
    private authService: AuthService,
    private socialAuth: SocialAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }


  login() {
    if (!this.loginForm.valid) return;

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);

    if (success) {
      const user = this.authService.getCurrentUser()!;

      switch (user.role) {
        case 'admin':  this.router.navigate(['/admin']);  break;
        case 'seller': this.router.navigate(['/seller']); break;
        default:       this.router.navigate(['/buyer']);
      }
    } else {
      alert('Email or password wrong!');
    }
  }

  // Google ile giriş
  signInWithGoogle(): void {
    this.loadingGoogle = true;
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        return this.authService.socialLogin('google', user.idToken).toPromise();
      })
      .then((u) => {
        this.loadingGoogle = false;
        if (u) {
          this.router.navigate(['/home']);
        } else {
          alert('Google ile giriş başarısız.');
        }
      })
      .catch(err => {
        this.loadingGoogle = false;
        console.error(err);
        alert('Google oturumu açılırken hata oluştu.');
      });
  }

  // Facebook ile giriş
  signInWithFacebook(): void {
    this.loadingFacebook = true;
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        return this.authService.socialLogin('facebook', user.authToken).toPromise();
      })
      .then((u) => {
        this.loadingFacebook = false;
        if (u) {
          this.router.navigate(['/home']);
        } else {
          alert('Facebook ile giriş başarısız.');
        }
      })
      .catch(err => {
        this.loadingFacebook = false;
        console.error(err);
        alert('Facebook oturumu açılırken hata oluştu.');
      });
  }


}
