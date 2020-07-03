import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServiceWeatherService {

  host = 'community-open-weather-map.p.rapidapi.com'
  key = 'b219028f08mshb5e9d7c8368d852p12dd2bjsnc6e4552f8f8e'

  constructor(private httpClient: HttpClient) { }

  getWeather(city) {
    const url = 'https://community-open-weather-map.p.rapidapi.com/weather?id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=' + city;
    const headers = new HttpHeaders({
      'x-rapidapi-host': this.host,
      'x-rapidapi-key': this.key
    })

    return this.httpClient.get(url, {headers}).toPromise()
  }

  currentTime() {
    const date = new Date()

    return date.getHours() + ":" + date.getMinutes()
  }

  convertInCelsius(number) {
    return (number - 273).toFixed(1)
  }

  getIcon(weather: String) {
    const weathers = [
      {
        weather: 'brocken clouds',
        asset: '../../assets/haze.svg'
      },
      {
        weather: 'haze',
        asset: '../../assets/haze.svg'
      },
      {
        weather: 'cloud',
        asset: '../../assets/cloud.svg'
      },
      {
        weather: 'thunderstorm',
        asset: '../../assets/thunderstorm.svg'
      },
      {
        weather: 'windy',
        asset: '../../assets/fog.svg'
      },
      {
        weather: 'fog',
        asset: '../../assets/fog.svg'
      },
      {
        weather: 'rain',
        asset: '../../assets/rainy.svg'
      },
      {
        weather: 'rainy',
        asset: '../../assets/rainy.svg'
      },
      {
        weather: 'snow',
        asset: '../../assets/snow.svg'
      }
    ]

    let asset = '../../assets/cloud.svg'
    weathers.forEach(value => {
      if(value.weather.toLowerCase().includes(weather.toLowerCase()) ||
      weather.toLowerCase().includes(value.weather.toLowerCase())) {

        asset = value.asset
      }
    });

    return asset
  }
}
