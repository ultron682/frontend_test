import { Component, OnInit } from "@angular/core";
import { MainContentService } from "../../services/main-content.service";

@Component({
  selector: "app-main-container",
  templateUrl: "./main-container.component.html",
  styleUrls: ["./main-container.component.scss"],
})
export class MainContainerComponent implements OnInit {
  constructor(private contentService: MainContentService) {}

  ngOnInit() {
    // console.log(this.contentService.getContent());
  }
}
