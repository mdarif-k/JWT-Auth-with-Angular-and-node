import { Component } from "@angular/core";
import { HelperService } from "./helper.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(helperService: HelperService) {
    let token = localStorage.getItem("token");
    if (token !== "null") 
    helperService.setSessionToken(token);
  }
}
