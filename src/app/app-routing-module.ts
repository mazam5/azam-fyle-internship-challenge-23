import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ReposListComponent } from "./components/repos-list/repos-list.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  {path:':username',component:ReposListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}