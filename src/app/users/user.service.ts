import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class UserService {
  userChanges = new Subject<User[]>();

  private users: User[] = [];

  constructor() {}

  setUsers(recipes: User[]) {
    this.users = recipes;
    this.userChanges.next(this.users.slice());
  }

  getUsers() {
    return this.users.slice();
  }

  getUser(index: number) {
    return this.users[index];
  }


  addUser(recipe: User) {
    this.users.push(recipe);
    this.userChanges.next(this.users.slice());
  }

  updateUser(index: number, newRecipe: User) {
    this.users[index] = newRecipe;
    this.userChanges.next(this.users.slice());
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.userChanges.next(this.users.slice());
  }
}
