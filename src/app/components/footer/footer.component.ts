import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MainContentService } from "../main/services/main-content.service";

@Component({
  standalone: true,
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  @Output() showPersonalDataEmitter = new EventEmitter();

  constructor(private mainContentService: MainContentService) {}

  ngOnInit() {}

  resetContent() {
    this.mainContentService.resetToStartSettings();
  }

  showName() {
    this.showPersonalDataEmitter.emit();
  }
}
