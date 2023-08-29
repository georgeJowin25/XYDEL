import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drop-location',
  templateUrl: './drop-location.page.html',
  styleUrls: ['./drop-location.page.scss'],
})
export class DropLocationPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  handleBack() {
    this.router.navigate(['/tabs/order']);
  }

}
