import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { WeatherEnergyService } from '../service/weatherEnergy.service';
import { ForecastResponse } from '../service/forecast_response.model';
import { SummaryResponse } from '../service/summary_response.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  forecastData: ForecastResponse;
  summaryData: SummaryResponse

  //constructor(private weatherEnergyService: WeatherEnergyService) {
  constructor(private weatherEnergyService: WeatherEnergyService) {
    this.forecastData = {
      "date": [
          "2024-11-25",
          "2024-11-26",
          "2024-11-27",
          "2024-11-28",
          "2024-11-29",
          "2024-11-30",
          "2024-12-01"
      ],
      "weather_code": [
          NaN ,
          NaN,
          NaN,
          NaN,
          NaN,
          NaN,
          NaN
      ],
      "temperature_2m_max": [
        NaN ,
        NaN,
        NaN,
        NaN,
        NaN,
        NaN,
        NaN
      ],
      "temperature_2m_min": [
        NaN ,
        NaN,
        NaN,
        NaN,
        NaN,
        NaN,
        NaN
      ],
      "generated_energy":NaN

  }
    this.summaryData = {
      "date": "loading data...",
      "average_pressure":     NaN,
      "average_sun_exposition_time":     NaN,
      "max_temperature":     NaN,
      "min_temperature":     NaN,
      "precipitation": "loading data..."
  }
  }

  public ngOnInit(): void {
    this.weatherEnergyService.forecastData$.subscribe((data) =>{
      if (data) { // Check if the received data is not null
          this.forecastData=data;
      } else {
        console.log("Received null or undefined forecast data, using default values");
      }
    })
    this.weatherEnergyService.summaryData$.subscribe((data) =>{
      if (data) { // Check if the received data is not null
          this.summaryData=data;
          this.summaryData.average_sun_exposition_time = parseFloat((data.average_sun_exposition_time / 60 / 60).toFixed(2));
      } else {
        console.log("Received null or undefined summary data, using default values");
      }
    })
    this.getLocationAndReloadData();
  }

  getLocationAndReloadData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            this.weatherEnergyService.fetchForecastAndSummary(lng, lat);
          }
        },
        (error: GeolocationPositionError) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
