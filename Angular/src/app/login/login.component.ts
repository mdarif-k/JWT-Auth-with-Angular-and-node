import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HelperService } from "../helper.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private helperServive: HelperService
  ) {
    this.loginForm = this.createLoginForm();
  }

  ngOnInit() {}

  loginToRegsiter() {
    this.router.navigateByUrl("/register");
  }

  createLoginForm() {
    return this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  loginHandler() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.helperServive.login(this.loginForm.value).subscribe(
        data => {
          console.log(data);
          this.helperServive.setSessionToken(data.toString());
          this.router.navigateByUrl('/dashboard')
        },
        err => {
          console.log(err.message);
        }
      );
    }
  }

  isValid(controlName) {
    return (
      this.loginForm.get(controlName).invalid &&
      this.loginForm.get(controlName).touched
    );
  }
}
