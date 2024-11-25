export interface ForecastResponse {
    date: string[];  // Array of dates (e.g., ["2024-10-20", "2024-10-21"])
    weather_code: number[];  // Array of weather codes (e.g., [1, 2, 3])
    temperature_2m_max: number[];  // Array of max temperatures (e.g., [20.5, 22.1, 19.4])
    temperature_2m_min: number[];  // Array of min temperatures (e.g., [10.1, 12.3, 9.8])
    generated_energy: number;  // Total generated energy (e.g., 10250.0)
  }