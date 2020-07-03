import { ServiceWeatherService } from './../service-weather/service-weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-home',
  templateUrl: './comp-home.component.html',
  styleUrls: ['./comp-home.component.css']
})
export class CompHomeComponent implements OnInit {

  public cities = []
  private city: String

  constructor(private weatherService: ServiceWeatherService) { }

  ngOnInit(): void {
    this.insertDummy()
  }

  insertDummy() {
    let dummy = {
      coord: {
        long: '',
        lat: ''
      },
      weather: [
        {
          main: ''
        }
      ],
      main: {
        temp: '',
        feels_like: '',
        temp_min: '',
        temp_max: '',
        pressure: '',
        humidity: ''
      },
      wind: {
        speed: ''
      },
      dt: '',
      sys: {
        sunrise: '',
        sunset: ''
      },
      name: ''
    }

    for(let i = 0; i < 9; i++) {
      this.cities.push(dummy)
    }
  }

  enterCity(event, index) {
    this.city = event.target.value
  }

  getWeather(index) {
    this.weatherService.getWeather(this.city)
    .then((result: any) => {
      result.update = this.weatherService.currentTime()
      this.cities[index] = result

      console.log(this.cities)
    })
    .catch((err) => {
      console.log(err)

      //will later make a proper alert
      alert('City not found')
    })
  }

}
