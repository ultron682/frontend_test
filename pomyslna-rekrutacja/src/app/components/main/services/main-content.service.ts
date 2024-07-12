import { Row } from "./../../../shared/models/Row";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Option } from "../enums/options";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MainContentService {
  private jsonURL = "content.json";
  private downloadedContent: Row[] = [];
  private workspaceContent: BehaviorSubject<Row[]> = new BehaviorSubject<Row[]>(
    []
  );
  workspaceContentsChange = this.workspaceContent.asObservable();
  selectedOption: Option = Option.None;

  constructor(private http: HttpClient) {
    this.loadContent();

    this.workspaceContentsChange.subscribe((data) => {
      if (data.length == 0) return;

      localStorage.setItem("workspaceContent", JSON.stringify(data));

      console.log("Zawartość zapisana", data);
    });
  }

  // w zadaniu trzeba było zaimplementować zapis przez localStorage, ale normalnie użyłbym ngrx
  private loadContent(): void {
    if (localStorage.getItem("downloadedContent") == null) {
      this.downloadContent();
    } else {
      console.log(JSON.parse(localStorage.getItem("downloadedContent")!));

      this.downloadedContent = JSON.parse(
        localStorage.getItem("downloadedContent")!
      );

      this.workspaceContent.next(
        JSON.parse(localStorage.getItem("workspaceContent")!)
      );
    }
  }

  private downloadContent(): void {
    this.http
      .get<string[]>(this.jsonURL)
      .pipe(
        catchError((error) => {
          console.error("Błąd podczas ładowania zawartości", error);
          return [];
        })
      )
      .pipe(
        map((data) =>
          data.map((content, index) => ({
            id: index + 1,
            content,
          }))
        )
      )
      .subscribe((data) => {
        this.downloadedContent = data;

        this.workspaceContent.next(
          this.downloadedContent.filter((row) => row.id % 2 === 0)
        ); // dodanie kilku wierszy do workspaceContent na start

        localStorage.setItem(
          "downloadedContent",
          JSON.stringify(this.downloadedContent)
        );

        console.log("Zawartość pobrana i zapisana", this.downloadedContent);
        // this.workspaceContentsChange.emit(this.workspaceContent);
      });
  }

  getNextRow(): Row | undefined {
    if (this.selectedOption == Option.First) {
      return this.downloadedContent[0];
    } else if (this.selectedOption == Option.Second) {
      return this.downloadedContent[1];
    } else if (this.selectedOption == Option.Random) {
      var randomOptions = this.downloadedContent.filter(
        (obj1) =>
          !this.workspaceContent.getValue().some((obj2) => obj1.id === obj2.id)
      );

      if (randomOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * randomOptions.length);
        return randomOptions[randomIndex];
      }
    }

    return undefined;
  }

  appendContent(): void {
    if (this.selectedOption == Option.None) {
      alert("Nie wybrano opcji");
      return;
    }

    var newContent = this.getNextRow();

    if (newContent == undefined) {
      alert("Brak możliwości dodania nowej zawartości");
      return;
    }

    this.workspaceContent.next([
      ...this.workspaceContent.getValue(),
      newContent,
    ]);
  }

  replaceContent(): void {
    if (this.selectedOption == Option.None) {
      alert("Nie wybrano opcji");
      return;
    }

    var newContent = this.getNextRow();
    if (newContent === undefined) {
      alert("Brak możliwości dodania nowej zawartości");
      return;
    }

    this.workspaceContent.next([newContent]);
  }

  setSelectedOption(option: Option): void {
    this.selectedOption = option;
  }

  resetToStartSettings(): void {
    localStorage.clear();

    this.workspaceContent.next([]);
    this.downloadedContent = [];

    this.selectedOption = Option.None;

    this.loadContent();
  }
}
