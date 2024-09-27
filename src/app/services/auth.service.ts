import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() { }

  login(tourGuideCode: string): void {
    // Compare the parameter to the specified value
    this.isLoggedIn = (tourGuideCode === 'pass');
  }

  logout() {
    this.isLoggedIn = false;
}
}
