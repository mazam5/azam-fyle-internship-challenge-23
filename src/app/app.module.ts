import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReposListComponent } from './components/repos-list/repos-list.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { ApiService } from './services/api.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    SkeletonLoaderComponent,
    ReposListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
