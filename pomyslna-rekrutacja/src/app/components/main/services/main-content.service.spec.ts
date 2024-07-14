import { TestBed } from "@angular/core/testing";
import { MainContentService } from "./main-content.service";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("Service: main-content", () => {
  let service: MainContentService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);


    TestBed.configureTestingModule({
      providers: [
        MainContentService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should load content from localStorage if available", () => {
    const mockContent = [
      { id: 1, content: "Test content 1" },
      { id: 2, content: "Test content 2" },
    ];
    localStorage.setItem("downloadedContent", JSON.stringify(mockContent));
    localStorage.setItem("workspaceContent", JSON.stringify(mockContent));

    // service need to be instantiated after localStorage is set to cancel download content.json
    service = new MainContentService(httpClientSpy);
    // @ts-ignore // private method so need to ignore TS error
    service.loadContent();

    // @ts-ignore
    expect(service.workspaceContent.getValue()).toEqual(mockContent);
  });
});
