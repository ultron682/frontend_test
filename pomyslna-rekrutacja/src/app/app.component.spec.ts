import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainModule } from './components/main/main.module';
import { MainContentService } from './components/main/services/main-content.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let mainContentServiceMock: jasmine.SpyObj<MainContentService>;

  beforeEach(async () => {
    mainContentServiceMock = jasmine.createSpyObj('MainContentService', ['onResetState']);
    mainContentServiceMock.onResetState = of(); // Mock the observable

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HeaderComponent, FooterComponent, MainModule],
      providers: [
        { provide: MainContentService, useValue: mainContentServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pomyslna-rekrutacja'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pomyslna-rekrutacja');
  });

  it('should initialize showPersonalDataContent to false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.showPersonalDataContent).toBeFalse();
  });

  it('should toggle showPersonalDataContent when switchVisibilityPersonalData is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.switchVisibilityPersonalData();
    expect(app.showPersonalDataContent).toBeTrue();

    app.switchVisibilityPersonalData();
    expect(app.showPersonalDataContent).toBeFalse();
  });

  it('should set showPersonalDataContent to false when onResetState is triggered', () => {
    mainContentServiceMock.onResetState.subscribe.and.callFake((callback: () => void) => callback());

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.showPersonalDataContent = true;
    mainContentServiceMock.onResetState.subscribe();

    expect(app.showPersonalDataContent).toBeFalse();
  });
});
