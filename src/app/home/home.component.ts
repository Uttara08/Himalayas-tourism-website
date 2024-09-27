import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tour } from '../models/tour';
import { TourService } from '../services/tour.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tours$: Observable<Tour[]> = new Observable<Tour[]>();
  filteredTours$: Observable<Tour[]> = new Observable<Tour[]>();
  searchText: string = '';
  noResultsFound: boolean = false; // Add a flag to track if no results are found

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    this.tours$ = this.tourService.getAllTours().pipe(
      map(tours => tours || []) // Ensure tours$ emits an empty array instead of null
    );
    this.filteredTours$ = this.tours$;
  }

  search(): void {
    this.filteredTours$ = this.tours$.pipe(
      map(tours => {
        const filteredTours = tours.filter(tour =>
          tour.tourName?.toLowerCase().includes(this.searchText.toLowerCase())
        );
        
        this.noResultsFound = filteredTours.length === 0;
        return filteredTours;
      })
    );
  }
  
  reset(): void {
    this.searchText = '';
    this.noResultsFound = false;
    this.filteredTours$ = this.tours$;
  }
}
