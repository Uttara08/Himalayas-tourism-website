import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../models/tour';
import { TourRequest } from '../models/tour-request';
import { RouteService } from '../services/route.service';
import { TourRequestService } from '../services/tour-request.service';
import { TourService } from '../services/tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tour-cart',
  templateUrl: './tour-cart.component.html',
  styleUrls: ['./tour-cart.component.css']
})
export class TourCartComponent implements OnInit {

  tour?: Tour;
  stars: Array<number> = [];
  tourRequestForm: FormGroup;
  submitStatus: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private tourService: TourService,
              private tourRequestService: TourRequestService,
              private routeService: RouteService,
              private snackBar: MatSnackBar) {
    this.tourRequestForm = this.fb.group({
      dateOfTravel: ['', Validators.required],
      customerName: ['', [Validators.required, Validators.pattern('^[A-Za-z].*')]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required, Validators.pattern('^[7896]\\d{9}$')]],
      customerAddress: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      const id = param.get("id") ?? "";
      this.tourService.getTour(id).subscribe(data => {
        this.tour = data;
        this.stars = new Array(this.tour.rating);
        this.submitStatus = false;
      });
    });

    this.tourRequestForm.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.tourRequestForm.markAllAsTouched();
      }
    });
  }

  makeRequest() {
    if (this.tourRequestForm.valid) {
      const tourRequest: TourRequest = {
        ...this.tourRequestForm.value,
        tourName: this.tour?.tourName
      };

      this.tourRequestService.saveTourRequest(tourRequest).subscribe({
        next: data => {
          this.snackBar.open("Order Placed", "", {
            duration: 3000
          });
          this.submitStatus = true;
          this.routeService.navigateToHomeView();
        },
        error: err => {
          alert(err);
        }
      });
    } else {
      this.tourRequestForm.markAllAsTouched();
    }
  }

  canDeactivate(): boolean {
    if (!this.submitStatus)
      this.submitStatus = confirm("You have not submitted a request to this order. Any details entered will be lost. Are you sure you want to leave?");
    return this.submitStatus;
  }
}
