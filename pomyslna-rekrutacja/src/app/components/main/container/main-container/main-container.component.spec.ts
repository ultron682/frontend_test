import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { MainContainerComponent } from "./main-container.component";
import { MainModule } from "../../main.module";
import { MainContentService } from "../../services/main-content.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("MainContainerComponent", () => {
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [MainContainerComponent],
      imports: [
        MainModule
      ],
      providers: [MainContentService,provideHttpClient(),
        provideHttpClientTesting()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(MainContainerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
