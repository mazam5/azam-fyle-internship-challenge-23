import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  githubUsername: string = '';
  constructor(private route: Router) { }


  onKeyPressEvent(event: any) {
    if (event.key === 'Enter' && this.githubUsername !== '') {
      this.route.navigate([this.githubUsername]);
    }
    this.githubUsername = '';
  }

  onSearchClick() {
    if (this.githubUsername !== '') {
      this.route.navigate([this.githubUsername]);
    }
    this.githubUsername = '';
  }
}
