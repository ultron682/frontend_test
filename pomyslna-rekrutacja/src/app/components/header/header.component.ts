import { MainContentService } from "./../main/services/main-content.service";
import { CommonModule } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  name = "Michał Mazur";
  @Input() isShowed = false;

  showPersonalData() {
    this.isShowed = true;
  }
}
