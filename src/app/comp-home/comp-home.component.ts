import { ServiceWeatherService } from './../service-weather/service-weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-home',
  templateUrl: './comp-home.component.html',
  styleUrls: ['./comp-home.component.css']
})
export class CompHomeComponent implements OnInit {

  public cities = []
  public name = []

  constructor(private weatherService: ServiceWeatherService) { }

  ngOnInit(): void {
    this.insertDummy()
    this.interval()
    this.getLocalData()
  }

  getLocalData() {
    if(localStorage.length != 0) {
      try {
        for(let i = 0; i < localStorage.length; i++) {
          this.cities[i] = JSON.parse(localStorage.getItem(i + ''));
        }
      }
      catch(e) {
        console.log(e)
      }
    }
  }

  interval() {
    const interval = setInterval(() => {
      for(let i = 0; i < this.name.length; i++) {
        if(this.name[i] != '') {
          this.getWeather(i)
        }
      }
    }, 30000)
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
      name: '',
      icon: ''
    }

    for(let i = 0; i < 9; i++) {
      this.cities.push(dummy)
      this.name.push('')
    }
    console.log(this.cities)
    console.log(this.name)
  }

  enterCity(event, index) {
    this.name[index] = event.target.value
  }

  getWeather(index) {
    console.log(this.name)

    let spinner = document.getElementById(index + 100)
    spinner.style.display = "block"

    this.weatherService.getWeather(this.name[index])
    .then((result: any) => {
      result.update = this.weatherService.currentTime()
      result.icon = this.weatherService.getIcon(result.weather[0].main)
      spinner.style.display = "none"

      this.cities[index] = result
      localStorage.setItem(index, JSON.stringify(result))

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
