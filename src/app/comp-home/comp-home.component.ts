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
    this.startUpdateInterval()
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
      name: ''
    }

    for(let i = 0; i < 9; i++) {
      this.cities.push(dummy)
    }
  }

  startUpdateInterval() {
    const interval = setInterval(() => {
      this.cities.forEach((value, index) => {
        if(value.name != '') {
          this.getWeather(index)
        }

        console.log(index + ' updated')
      })
    }, 30000)
  }

  enterCity(event, index) {
    this.city = event.target.value
  }

  getWeather(index) {

    let spinner = document.getElementById(index + 100)
    spinner.style.display = "block"

    this.weatherService.getWeather(this.city)
    .then((result: any) => {
      result.update = this.weatherService.currentTime()
      result.icon = this.weatherService.getIcon(result.weather[0].main)
      spinner.style.display = "none"

      this.cities[index] = result

      console.log(this.cities)
    })
    .catch((err) => {
      console.log(err)
      //show error
      spinner.style.display = "none"
      document.getElementById(index).style.display = "block"
    })
  }

}
