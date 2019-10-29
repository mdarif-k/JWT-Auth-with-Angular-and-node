import { Component, OnInit } from "@angular/core";
import { HelperService } from "../helper.service";
import { Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public username: string = "";

  constructor(
    private helperService: HelperService, 
    private router: Router
    ) {
    let params = new HttpParams().append("token", helperService.token);
    this.helperService.getUserName(params).subscribe(
      data => {
        this.username = data.toString();
      },
      err => {
        this.router.navigateByUrl("login");
      }
    );
  }

  ngOnInit() {}

  logout() {
    this.helperService.setSessionToken(null);
    this.router.navigateByUrl("/login");
  }
}
