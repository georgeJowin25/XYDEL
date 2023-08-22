import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-up-location',
  templateUrl: './pick-up-location.page.html',
  styleUrls: ['./pick-up-location.page.scss'],
})
export class PickUpLocationPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  

  handleBack() {
    this.router.navigate(['/tabs/order']);
  }

}
