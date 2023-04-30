import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TourCartComponent } from './tour-cart/tour-cart.component';
import { TourRequestsComponent } from './tour-requests/tour-requests.component';

const routes: Routes = [
  
  { path: "", component: HomeComponent },
  { path: "tour-cart/:id", component: TourCartComponent  },
  { path: "tour-requests", component: TourRequestsComponent },
  { path: "**", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
