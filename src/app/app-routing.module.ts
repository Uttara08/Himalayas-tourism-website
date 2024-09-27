import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TourCartComponent } from './tour-cart/tour-cart.component';
import { TourRequestsComponent } from './tour-requests/tour-requests.component';
import { LoginComponent } from './login/login.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { AuthGuard } from './services/auth.guard';
import { ExplorePageComponent } from './explore-page/explore-page.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: HomeComponent },
  { path: "explore-page", component: ExplorePageComponent },
  { path: "tour-cart/:id", component: TourCartComponent, canDeactivate: [CanDeactivateGuard] }, // Add CanDeactivateGuard to canDeactivate
  { path: "tour-requests", component: TourRequestsComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
