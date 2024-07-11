import { Row } from "./../../../shared/models/Row";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Option } from "../enums/options";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MainContentService {
  private jsonURL = "content.json";
  private downloadedContent: Row[] = [];
  private workspaceContent = new Subject<Row[]>();
  workspaceContentsChange = new EventEmitter<Row[]>();
  selectedOption: Option = Option.None;

  constructor(private http: HttpClient) {
    this.loadContent();

    this.workspaceContent.subscribe((data) => {
      this.workspaceContentsChange.emit(data);

      localStorage.setItem(
        "workspaceContent",
        JSON.stringify(this.workspaceContent)
      );
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
      this.workspaceContent = JSON.parse(
        localStorage.getItem("workspaceContent")!
      );
      console.log(
        "Zawartość załadowana z pamięci podręcznej",
        this.downloadedContent
      );
      // this.workspaceContentsChange.emit(this.workspaceContent);
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
        this.workspaceContent = this.downloadedContent.filter(
          (row) => row.id % 2 === 0
        ); // dodanie kilku wierszy do workspaceContent na start

        localStorage.setItem(
          "downloadedContent",
          JSON.stringify(this.downloadedContent)
        );

        console.log("Zawartość pobrana i zapisana", this.downloadedContent);
        // this.workspaceContentsChange.emit(this.workspaceContent);
      });
  }

  // todo: remove this method
  getContentsNoEmpty(): Observable<Row[]> {
    return new Observable((observer) => {
      observer.next(this.downloadedContent);
    });
  }

  getNextRow(): Row | undefined {
    if (this.selectedOption == Option.First) {
      return this.downloadedContent[0];
    } else if (this.selectedOption == Option.Second) {
      return this.downloadedContent[1];
    } else if (this.selectedOption == Option.Random) {
      var randomOptions = this.downloadedContent.filter(
        (obj1) => !this.workspaceContent.some((obj2) => obj1.id === obj2.id)
      );

      if (randomOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * randomOptions.length);
        return randomOptions[randomIndex];
      }

      return undefined;
    } else {
      return undefined;
    }
  }

  onNewContent(): void {
    if (this.workspaceContent.length == 0) {
      this.appendContent();
    } else {
      this.replaceContent();
    }
  }

  appendContent(): void {
    var newContent = this.getNextRow();
    if (newContent === undefined) return;

    console.log("Nowa zawartość", newContent);
    if (newContent == undefined) {
      alert("Nie wybrano opcji");
      return;
    }

    this.workspaceContent.push(newContent);
    localStorage.setItem(
      "workspaceContent",
      JSON.stringify(this.downloadedContent)
    );
    this.workspaceContentsChange.emit(this.workspaceContent);
    console.log("Zawartość dodana", this.downloadedContent);
  }

  replaceContent(): void {
    var newContent = this.getNextRow();
    if (newContent === undefined) return;

    this.workspaceContent = [newContent];
    localStorage.setItem(
      "workspaceContent",
      JSON.stringify(this.downloadedContent)
    );
    this.workspaceContentsChange.emit(this.workspaceContent);
  }

  setSelectedOption(option: Option): void {
    this.selectedOption = option;
  }
}
