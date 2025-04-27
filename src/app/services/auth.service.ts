import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
  city?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
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
      this.currentUserSubject.next(user);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    if (this.users.some(u => u.email === email)) {
      return false;
    }
    const newUser: User = { email, password };
    this.users.push(newUser);
    this.currentUserSubject.next(newUser);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateCurrentUser(data: Partial<Omit<User, 'email' | 'password'>>): void {
    const user = this.currentUserSubject.value;
    if (user) {
      const updated = { ...user, ...data };
      const idx = this.users.findIndex(u => u.email === user.email);
      if (idx > -1) this.users[idx] = updated;
      this.currentUserSubject.next(updated);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(updated));
      }
    }
  }
}
