import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user';
import { phoneNumberValidator } from "../validator/phoneNumber.validators";
import { LoginService } from '../service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error_msg!: string;
  isError: boolean = false;
  form: any;
  user!: User;
  constructor(formBuilder: FormBuilder, private loginService: LoginService) {
    this.form = formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999), phoneNumberValidator.phoneNumberValidations]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });
  }
<<<<<<< HEAD
=======


>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
  get fc() {
    return this.form.controls;
  }
  onSubmit() {
    this.user = new User();
    let phoneNumber = this.form.controls['phoneNumber'].value;
    let password = this.form.controls['password'].value;
    this.user.phoneNumber = phoneNumber;
    this.user.password = password;
<<<<<<< HEAD
    this.loginService.doLogin(this.user).subscribe(
      (response: any) => {
        this.loginService.loginUser(response.token, response.role, response.refreshToken, response.userId); 
=======

    this.loginService.doLogin(this.user).subscribe(
      (response: any) => {
        this.loginService.loginUser(response.token, response.role, response.refreshToken, response.userId);
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
        if (response.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/user";
        }

      },
      error => {
        this.error_msg = error;
        if (this.error_msg.length > 0) {
          this.isError = true;
        }
      }
    )
  }
}
