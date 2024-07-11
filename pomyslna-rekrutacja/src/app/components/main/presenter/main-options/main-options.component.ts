import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MainContentService } from "../../services/main-content.service";
import { Option } from "../../enums/options";

@Component({
  selector: "app-main-options",
  templateUrl: "./main-options.component.html",
  styleUrls: ["./main-options.component.scss"],
})
export class MainOptionsComponent implements OnInit {
  optionsForm = new FormGroup({
    option: new FormControl(""),
  });

  constructor(private mainContentService: MainContentService) {}

  ngOnInit() {
    this.optionsForm.valueChanges.subscribe((value) => {
      this.mainContentService.setSelectedOption(
        value.option === "first"
          ? Option.First
          : value.option === "second"
          ? Option.Second
          : value.option === "random"
          ? Option.Random
          : Option.None
      );
    });
  }
}
