import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
  city?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 1) private store
  private users: User[] = [];

  // 2) currentUserSubject + observable
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    // isteğe bağlı: localStorage’dan restore edebilirsin
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUserSubject.next(JSON.parse(saved));
    }
  }

  // 3) login → subject.next(user)
  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUserSubject.next(user);
      // isteğe bağlı persist
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  // 4) register → otomatik login
  register(email: string, password: string): boolean {
    if (this.users.some(u => u.email === email)) {
      return false;
    }
    const newUser: User = { email, password };
    this.users.push(newUser);

    // istersen doğrudan login yap
    this.currentUserSubject.next(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  }

  // 5) logout → subject.next(null)
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  // 6) yardımcı metotlar
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
      // güncel listeye de yansıtalım
      const idx = this.users.findIndex(u => u.email === user.email);
      if (idx > -1) this.users[idx] = updated;
      this.currentUserSubject.next(updated);
      localStorage.setItem('currentUser', JSON.stringify(updated));
    }
  }
}
