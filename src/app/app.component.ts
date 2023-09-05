import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private storage: Storage) {}
  ngOnInit() {
    this.storage.create();
    this.storage.get('id').then((id: string) =>{
      if (id != null) {
        this.router.navigate(['tabs/home']);
      }
      else{
      this.router.navigate(['/getting-started']);
    }
    })
   
}
}