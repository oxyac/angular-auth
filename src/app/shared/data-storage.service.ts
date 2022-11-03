import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { ResponseModel } from './response.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {}

  storeUsers() {
    const recipes = this.userService.getUsers();
    this.http
      .put(
        'https://auth-demo-2bac2-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchUsers() {
    return this.http
      .get<ResponseModel>(
        // 'https://auth-demo-2bac2-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        'assets/users.json'
      )
      .pipe(
        map(response => {

          return response.data.map(user => {
            return {
              ...user
            };
          });
        }),
        tap(users => {
          this.userService.setUsers(users);
        })
      );
  }
}
