import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';


export type Role = 'BUYER' | 'SELLER' | 'ADMIN';

export interface User {
  email: string;
  password?: string;
  role?:Role;
  city?: string;
  token?: string;
  provider?: 'google' | 'facebook';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,private router:Router
  ) {

    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        this.currentUserSubject.next(JSON.parse(saved));
      }
    }
  }


  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    if (this.users.some(u => u.email === email)) return false;
    const newUser: User = { email, password,role:'BUYER' };
    this.users.push(newUser);
    this.setCurrentUser(newUser);
    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateCurrentUser(data: Partial<Omit<User, 'email' | 'password' | 'provider'>>): void {
    const user = this.currentUserSubject.value;
    if (!user) return;
    const updated = { ...user, ...data };
    const idx = this.users.findIndex(u => u.email === user.email);
    if (idx > -1) this.users[idx] = updated;
    this.setCurrentUser(updated);
  }


 socialLogin(provider: 'google' | 'facebook', token: string): Observable<User | null> {

  const user: User = { email: `${provider}@social`, provider, token };
  this.currentUserSubject.next(user);
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  return of(user);
}


  private setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
}
