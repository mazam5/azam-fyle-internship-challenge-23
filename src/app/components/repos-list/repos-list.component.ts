import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

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
  routerSubscription: Subscription;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.routerSubscription = this.router.events.subscribe((event) => {
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

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  loadData() {
    this.page = 1;
    this.loading = true;
    this.getUser();
  }

  getUser() {
    this.api.getUser(this.githubUsername).subscribe(
      data => {
        this.userData = data;
        this.userError = false;
        this.getRepos();
      },
      error => {
        this.userError = true;
        this.loading = false;
        console.error(error);
      }
    );
  }

  getRepos() {
    this.api.getRepos(this.githubUsername, this.page, this.per_page).subscribe(
      data => {
        this.userRepos = data;
        this.reposError = false;
        this.loading = false;
      },
      error => {
        this.reposError = true;
        this.loading = false;
        console.error(error);
      }
    );
  }

  nextPage() {
    this.page++;
    this.loadRepos();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadRepos();
    }
  }

  onPerPageChange(event: any) {
    this.per_page = event.target.value;
    this.page = 1;
    this.loadRepos();
  }

  private loadRepos() {
    this.loading = true;
    this.getRepos();
  }
}
