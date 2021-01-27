import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private _sessionService: SessionService
  ) { }

  ngOnInit(): void {

    if(this._sessionService.getUserId()!=undefined){
      this._router.navigate(["/home"]);
    }

    this.form = this._builder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    },
    {
      validators : confirmPasswordValidator
    }
    )
  }

  public register() {
    if (this.form.valid) {
      this.user = new User();
      this.user.userName = this.form.controls['username'].value;
      this.user.email = this.form.controls['email'].value;
      this.user.passwordHash = this.form.controls['pwd'].value;
      this._userService.createUser(this.user).subscribe({
        next: () => this._router.navigate(["/home"]),
        error: (error) => console.log(error)
      })
    }

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
