import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MainModule } from "./components/main/main.module";
import { MainContentService } from "./components/main/services/main-content.service";
import { EventEmitter } from "@angular/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("AppComponent", () => {
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainModule,
        HttpClientModule,
      ],
      providers: [MainContentService],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements and attributes
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should initialize showPersonalDataContent to false", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.showPersonalDataContent).toBeFalse();
  });

  it("should toggle showPersonalDataContent when switchVisibilityPersonalData is called", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.switchVisibilityPersonalData();
    expect(app.showPersonalDataContent).toBeTrue();

    app.switchVisibilityPersonalData();
    expect(app.showPersonalDataContent).toBeFalse();
  });

  it("should set showPersonalDataContent to false when onResetState is triggered", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const service = fixture.debugElement.injector.get(MainContentService);
    const app = fixture.componentInstance;

    app.showPersonalDataContent = true;
    service.onResetState.emit();

    expect(app.showPersonalDataContent).toBeFalse();
  });
});
