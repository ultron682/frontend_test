import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MainModule } from "./components/main/main.module";
import { FormsModule } from "@angular/forms";
import { MainContentService } from "./components/main/services/main-content.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MainModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  showPersonalDataContent = false;

  constructor(private mainContentService: MainContentService) {
    mainContentService.onResetState.subscribe(() => {
      this.showPersonalDataContent = false;
    });
  }

  switchVisibilityPersonalData() {
    this.showPersonalDataContent = !this.showPersonalDataContent;
  }
}
