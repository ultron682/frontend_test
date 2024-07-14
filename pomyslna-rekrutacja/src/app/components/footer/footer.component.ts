import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { MainContentService } from "../main/services/main-content.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  @Output() showPersonalDataEmitter = new EventEmitter();
  @Input() showPersonalDataContent: boolean = false;
  isChecked = false;

  constructor(private mainContentService: MainContentService) {}

  @HostListener("document:click")
  clickEventToHideMenu() {
    this.isChecked = false;
  }

  resetContent() {
    // this.isChecked = false;
    this.mainContentService.resetToStartSettings();
  }

  switchPersonalDataVisibility() {
    // this.isChecked = false;
    this.showPersonalDataEmitter.emit();
  }
}
