import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-home',
  templateUrl: './comp-home.component.html',
  styleUrls: ['./comp-home.component.css']
})
export class CompHomeComponent implements OnInit {

  public cities = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
  private city: String

  constructor() { }

  ngOnInit(): void {
  }

  enterCity(event, index) {
    this.city = event.target.value
  }

}
