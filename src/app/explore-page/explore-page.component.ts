import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tour } from '../models/tour';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {
  tours$: Observable<Tour[]> = new Observable<Tour[]>();
  filteredTours$: Observable<Tour[]> = new Observable<Tour[]>();
  searchText: string = '';
  noResultsFound: boolean = false;

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
