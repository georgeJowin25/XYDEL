import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.page.html',
  styleUrls: ['./getting-started.page.scss'],
})
export class GettingStartedPage implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
  }
  getStarted() {
    this.router.navigate(['/mobile-number']);
  }
}
