import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private _sessionService: SessionService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this._sessionService.getUserId() == undefined || this._sessionService.getUserRole() != "Admin") {
      this._router.navigate(["/home"]);
    }

    this._userService.getAll().subscribe(
      (data) => this.users = data
    )
  }

  public delete(id: number){
    this._userService.deleteUser(id).subscribe({
      next: () => location.reload(),
      error: (error) => console.log(error)
    })
  }

}
