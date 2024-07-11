import { Row } from "../../../../shared/models/Row";
import { MainContentService } from "./../../services/main-content.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main-description",
  templateUrl: "./main-description.component.html",
  styleUrls: ["./main-description.component.scss"],
})
export class MainDescriptionComponent implements OnInit {
  contents: Row[] = [];

  constructor(private mainContentService: MainContentService) {
    this.mainContentService.getContentsNoEmpty().subscribe((data) => {
      this.contents = data;
    });

    this.mainContentService.downloadedContentsChange.subscribe((data) => {
      this.contents = data;
      console.log("podmianka");
    });
  }

  ngOnInit() {}
}
