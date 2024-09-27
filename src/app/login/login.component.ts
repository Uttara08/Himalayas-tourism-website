import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { RouteService } from '../services/route.service'; // Import RouteService
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tourGuideCode: string = '';

  constructor(private authService: AuthService, private routeService: RouteService) { }

  ngOnInit(): void {
  }
  validateTourGuideCode() {
    this.authService.login(this.tourGuideCode);
    if (this.authService.isLoggedIn) {
      this.routeService.navigateToTourRequestsView();
    }
  }

}
