import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HelperService } from "../helper.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private router: Router
    ) {
    this.registerForm = this.createRegisterForm();
  }

  ngOnInit() {}

  createRegisterForm() {
    return this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  isValid(controlName) {
    return (
      !this.registerForm.get(controlName).valid &&
      this.registerForm.get(controlName).touched
    );
  }

  registerHandler() {
    console.log(this.registerForm.value);
    this.helperService.registerUser(this.registerForm.value)
    .subscribe(
      data => {
        this.message = "user registered successfully!"
      },
      err => {
        this.message = err.message
      }
    );
  }

  registerToLogin() {
    this.router.navigateByUrl('/login');
  }
}
