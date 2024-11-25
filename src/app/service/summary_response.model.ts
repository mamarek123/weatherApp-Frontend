export interface SummaryResponse {
    date: string; // ISO date string
    average_pressure: number; // Average pressure in hPa or relevant unit
    average_sun_exposition_time: number; // Time in hours
    max_temperature: number; // Max temperature in °C
    min_temperature: number; // Min temperature in °C
    precipitation: string; // Descriptive precipitation data
  }
  