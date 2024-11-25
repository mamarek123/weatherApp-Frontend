import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ForecastResponse } from "./forecast_response.model";
import { SummaryResponse } from "./summary_response.model";

@Injectable({ providedIn: 'root' })
export class WeatherEnergyService {
  private forecastDataSubject = new BehaviorSubject<ForecastResponse | null>(null);
  forecastData$ = this.forecastDataSubject.asObservable();

  private summaryDataSubject = new BehaviorSubject<SummaryResponse | null>(null);
  summaryData$ = this.summaryDataSubject.asObservable();

  private apiUrl = 'https://weatherapp-backend-27nf.onrender.com/api/v1/weekly';


  constructor(private http: HttpClient) {}

  fetchSummary(lng:number, lat: number): void{
    const params = new HttpParams()
    .set('latitude', lat.toString())
    .set('longitude', lng.toString());

        this.http.get<SummaryResponse>(this.apiUrl + '/summary', { params }).subscribe(
      (data) => {
        this.summaryDataSubject.next(data); 

      },
      (error) => {
        console.error("Error fetching forecast:", error);
      }
    );
  }

  fetchForecastAndSummary(lng: number, lat: number): void {
    this.fetchForecast(lng,lat);
    this.fetchSummary(lng,lat);
  }

  fetchForecast(lng: number, lat: number): void {
    const params = new HttpParams()
      .set('latitude', lat.toString())
      .set('longitude', lng.toString());


    this.http.get<ForecastResponse>(this.apiUrl + '/forecast', { params }).subscribe(
      (data) => {
        this.forecastDataSubject.next(data); 
      },
      (error) => {
        console.error("Error fetching forecast:", error);
      }
    );
  }
}
