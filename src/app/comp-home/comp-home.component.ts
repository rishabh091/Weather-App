import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-home',
  templateUrl: './comp-home.component.html',
  styleUrls: ['./comp-home.component.css']
})
export class CompHomeComponent implements OnInit {

  public cities = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  constructor() { }

  ngOnInit(): void {
  }

}
