import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {

  updatedUser: User;
  form: FormGroup;

  constructor(
    public _userService: UserService,
    private _sessionService: SessionService,
    private _builder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {

    if (this._sessionService.getUserId() == undefined || this._sessionService.getUserRole() == 'Admin') {
      this._router.navigate(["/home"]);
    }

    this.form = this._builder.group({
      username: [this._sessionService.getUserName(), [Validators.required]],
      email: [this._sessionService.getEmail(), [Validators.required]],
      pwd: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    },
      {
        validators: confirmPasswordValidator
      }
    )
  }

  public update() {
    if (this.form.valid) {
      this.updatedUser = new User()
      this.updatedUser.id = this._sessionService.getUserId();
      this.updatedUser.userName = this.form.controls['username'].value;
      this.updatedUser.email = this.form.controls['email'].value;
      this.updatedUser.passwordHash = this.form.controls['pwd'].value

      this._userService.updateUser(this._sessionService.getUserId(), this.updatedUser).subscribe({
        next: () => this._router.navigate(["/home"]),
        error: (error) => console.log(error)
      })
    }
  }

  public deleteAccount(){
    this._userService.deleteUser(this._sessionService.getUserId()).subscribe({
      next: ()=> {
        this._sessionService.logout(),
        this._router.navigate(["/home"])
      },
      error: (error) => console.log(error)
    })
  }

}

export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const pwd = control.get('pwd').value;
  const confirm = control.get('confirm').value;
  if ((control.get('confirm').dirty || control.get('confirm').touched)) {
    return pwd === confirm ? null : { showError: true };
  }
  return null;

}
