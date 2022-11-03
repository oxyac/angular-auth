import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserResolverService } from './users/user-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/crud', pathMatch: 'full' },
  {
    path: 'crud',
    component: UserListComponent,
    canActivate: [AuthGuard],
    resolve: [UserResolverService]
  },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
