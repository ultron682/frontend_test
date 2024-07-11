import { Row } from "./../../../shared/models/Row";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Option } from "../enums/options";

@Injectable({
  providedIn: "root",
})
export class MainContentService {
  private jsonURL = "content.json";
  private downloadedContents: Row[] = [];
  downloadedContentsChange = new EventEmitter<Row[]>();
  selectedOption: Option = Option.None;

  constructor(private http: HttpClient) {
    this.loadContent();
  }

  // w zadaniu trzeba było zaimplementować zapis przez localStorage, ale normalnie użyłbym ngrx
  private loadContent(): void {
    if (localStorage.getItem("content") == null) {
      this.downloadContent();
    } else {
      console.log(JSON.parse(localStorage.getItem("content")!));
      this.downloadedContents = JSON.parse(localStorage.getItem("content")!);
      console.log(
        "Zawartość załadowana z pamięci podręcznej",
        this.downloadedContents
      );
      this.downloadedContentsChange.emit(this.downloadedContents);
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
        this.downloadedContents = data;
        localStorage.setItem(
          "content",
          JSON.stringify(this.downloadedContents)
        );
        console.log("Zawartość pobrana i zapisana", this.downloadedContents);
        this.downloadedContentsChange.emit(this.downloadedContents);
      });
  }

  // todo: remove this method
  getContentsNoEmpty(): Observable<Row[]> {
    return new Observable((observer) => {
      observer.next(this.downloadedContents);
    });
  }

  getNextRow(): Row {
    if (this.selectedOption == Option.First) {
      return this.downloadedContents[0];
    } else if (this.selectedOption == Option.Second) {
      return this.downloadedContents[1];
    } else if (this.selectedOption == Option.Random) {
      const randomIndex = Math.floor(
        Math.random() * this.downloadedContents.length
      );
      return this.downloadedContents[randomIndex];
    } else {
      return {
        id: 0,
        content: "",
      };
    }
  }

  appendContent(content: string): void {
    var newContent: Row = {
      id: this.downloadedContents.length + 1,
      content,
    };

    this.downloadedContents.push(newContent);
    localStorage.setItem("content", JSON.stringify(this.downloadedContents));
    this.downloadedContentsChange.emit(this.downloadedContents);
    console.log("Zawartość dodana", this.downloadedContents);
  }

  replaceContent(content: string): void {
    var newContent: Row = this.getNextRow();

    this.downloadedContents = [newContent];
    localStorage.setItem("content", JSON.stringify(this.downloadedContents));
    this.downloadedContentsChange.emit(this.downloadedContents);
  }

  setSelectedOption(option: Option): void {
    this.selectedOption = option;
  }
}
