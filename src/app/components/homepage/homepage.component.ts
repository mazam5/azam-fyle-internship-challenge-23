import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})


export class HomepageComponent {
  githubUsername: string = '';
  constructor(private route: Router) { }

  onKeyPressEvent(event: any) {
    if (event.key === 'Enter' && this.githubUsername !== '') {
      this.route.navigate([this.githubUsername]);
    }
  }

  onSearchClick() {
    if (this.githubUsername !== '') {
      this.route.navigate([this.githubUsername]);
    }
  }
}
