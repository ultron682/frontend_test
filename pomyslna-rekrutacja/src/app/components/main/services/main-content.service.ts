import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Row } from "../../../shared/models/Row";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MainContentService {
  private jsonURL = "content.json";
  private downloadedContents: Row[] = [];
  downloadedContentsChange = new EventEmitter<Row[]>();

  constructor(private http: HttpClient) {
    this.loadContent();
  }

  // w zadaniu trzeba było zaimplementować zapis przez localStorage, ale normalnie użyłbym
  private loadContent(): void {
    if (localStorage.getItem("content") == null) {
      this.downloadContent();
    } else {
      console.log(JSON.parse(localStorage.getItem("content")!));
      this.downloadedContents = JSON.parse(localStorage.getItem("content")!);
      console.log("Zawartość załadowana z pamięci podręcznej", this.downloadedContents);
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

  getContentsNoEmpty(): Observable<Row[]> {
    return new Observable((observer) => {
      observer.next(this.downloadedContents);
    });
  }
}
