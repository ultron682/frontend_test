import { Row } from "../../../../shared/models/Row";
import { MainContentService } from "./../../services/main-content.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main-description",
  templateUrl: "./main-description.component.html",
  styleUrls: ["./main-description.component.scss"],
})
export class MainDescriptionComponent {
  contents: Row[] = [];
  headerText =
    "Blok z długą nazwą, która sama się przytnie i na końcu doda kropki.";

  constructor(private mainContentService: MainContentService) {
    this.mainContentService.workspaceContentsChange.subscribe((data) => {
      this.contents = data;
    });
  }
}
