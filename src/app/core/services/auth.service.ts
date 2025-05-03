import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }               from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map }                             from 'rxjs/operators';
import { Router }                          from '@angular/router';

export type Role = 'buyer' | 'seller' | 'admin';

export interface User {
  fullName?:String;
  email: string;
  password?: string;
  role?: Role;
  city?: string;
  token?: string;
  provider?: 'google' | 'facebook';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [];

  // Mevcut kullanıcı bilgisini taşır
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Giriş durumu ve rolü reaktif olarak izlemek için
  public isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(map(u => !!u));
  public userRole$: Observable<Role | null>    = this.currentUser$.pipe(map(u => u?.role ?? null));

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {
    // Sayfa yenilendiğinde localStorage'daki user'ı geri yükle
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        this.currentUserSubject.next(JSON.parse(saved));
      }
    }
  }

  /** Eşzamanlı (sync) olarak rolü dönen getter */
  public get userRole(): Role | null {
    return this.currentUserSubject.value?.role ?? null;
  }

  /** Oturum açma */
  login(email: string, password: string): Observable<User | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.setCurrentUser(user);
      return of(user);
    }
    return of(null);
  }

  /** Kayıt olma (default role: buyer) */
  register(email: string, password: string): Observable<User | null> {
    if (this.users.some(u => u.email === email)) {
      return of(null);
    }
    const newUser: User = { email, password, role: 'buyer' };
    this.users.push(newUser);
    this.setCurrentUser(newUser);
    return of(newUser);
  }

  /** Çıkış yapma */
  logout(): void {
    this.currentUserSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/home']);
  }

  /** Senkron login anlık durum kontrolü */
  public isLoggedInSnapshot(): boolean {
    return !!this.currentUserSubject.value;
  }

  /** Senkron user nesnesi */
  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /** Kullanıcı bilgisini güncelleme */
  updateCurrentUser(data: Partial<Omit<User, 'email' | 'password' | 'provider'>>): void {
    const user = this.currentUserSubject.value;
    if (!user) return;
    const updated = { ...user, ...data };
    const idx = this.users.findIndex(u => u.email === user.email);
    if (idx > -1) this.users[idx] = updated;
    this.setCurrentUser(updated);
  }

  /** Google/Facebook ile sosyal login */
  socialLogin(provider: 'google' | 'facebook', token: string): Observable<User> {
    const user: User = {
      email: `${provider}@social`,
      provider,
      token,
      role: 'buyer'
    };
    this.setCurrentUser(user);
    return of(user);
  }

  /** Internal: Subject güncelle ve localStorage'a yaz */
  private setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
}
