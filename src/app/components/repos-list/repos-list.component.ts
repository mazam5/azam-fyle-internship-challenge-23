import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss']
})
export class ReposListComponent implements OnInit {
  page: number = 1;
  per_page: number = 10;
  userData: any = {};
  userRepos: any[] = [];
  githubUsername: string = '';
  loading: boolean = false;
  userError: boolean = false;
  reposError: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.githubUsername = this.route.snapshot.paramMap.get('username') || '';
    if (this.githubUsername) {
      this.loadData();
    }
  }

  async loadData() {
    this.page = 1;
    this.loading = true;
    await this.getUser();
    await this.getRepos();
    this.loading = false;
  }

  async getUser() {
    this.api.getUser(this.githubUsername).subscribe(
      data => {
        this.userData = data;
        this.userError = false;
      },
      error => {
        this.userError = true;
        console.error(error);
      }
    );
  }

  async getRepos() {
    this.api.getRepos(this.githubUsername, this.page, this.per_page).subscribe(
      data => {
        this.userRepos = data;
        this.reposError = false;
      },
      error => {
        this.reposError = true;
        console.error(error);
      }
    );
  }

  async nextPage() {
    this.page++;
    await this.getRepos();
  }

  async prevPage() {
    if (this.page > 1) {
      this.page--;
      await this.getRepos();
    }
  }

  async onPerPageChange(event: any) {
    this.per_page = event.target.value;
    this.page = 1;
    await this.getRepos();
  }
}
