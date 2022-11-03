import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})
export class UserListComponent implements OnInit {

  subscription: Subscription | undefined;

  formDialog: boolean = false;
  submitted: boolean = false;

  users: User[] = [];
  selectedUsers: User[] = [];

  titles: SelectItem[] = [
    {label: 'Project Manager', value: 'PM'},
    {label: 'Programmer', value: 'PG'},
    {label: 'Account Manager', value: 'AM'}];

  clonedUsers: { [s: string]: User; } = {};

  user: User;

  @ViewChild('dt') dt: any;

  constructor(private userService: UserService, private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.user = new User(1, '', '', '', '', 1);

  }

  ngOnInit() {
    this.subscription = this.userService.userChanges
      .subscribe(
        (users: User[]) => {
          console.log(users)
          this.users = users;
        }
      );
    this.users = this.userService.getUsers();
  }

  onRowEditInit(user: User) {
    this.clonedUsers[user.id] = {...user};
  }

  onRowEditSave(user: User) {
    if (user.phone > 0) {
      delete this.clonedUsers[user.id];
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is updated'});
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Invalid Price'});
    }
  }

  onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedUsers[user.id];
    delete this.clonedUsers[user.id];
  }

  openNew() {
    this.user = new User(1, '', '', '', '', 373);
    this.submitted = false;
    this.formDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(val => !this.selectedUsers?.includes(val));
        this.selectedUsers = [];
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
      }
    });
  }

  editUser(user: User) {
    this.user = {...user};
    this.formDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(val => val.id !== user.id);
        this.user = new User(1, '', '', '', '', 1);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.formDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;

    if (this.user?.name.trim()) {
      if (this.user.id != 1) {
        this.users[this.user.id] = this.user;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000});
      } else {
        this.user.id = Math.floor(Math.random() * 10000);
        this.users.push(this.user);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000});
      }

      this.users = [...this.users];
      this.formDialog = false;
      this.user = new User(1, '', '', '', '', 1);
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}
