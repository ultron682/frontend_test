// import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
// import { MainContainerComponent } from './main-container.component';
// import { MainContentService } from '../services/main-content.service';
// import { EventEmitter } from '@angular/core';
// import { of } from 'rxjs';

// describe('MainContainerComponent', () => {
//   let component: MainContainerComponent;
//   let fixture: ComponentFixture<MainContainerComponent>;
//   let mainContentServiceMock: MainContentService;

//   beforeEach(async () => {
//     mainContentServiceMock = {
//       onResetState: new EventEmitter() // Mock the observable with EventEmitter
//     } as MainContentService; // Type assertion

//     await TestBed.configureTestingModule({
//       declarations: [MainContainerComponent],
//       providers: [
//         { provide: MainContentService, useValue: mainContentServiceMock }
//       ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MainContainerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should handle onResetState subscription', fakeAsync(() => {
//     // Simulate triggering the observable
//     let triggered = false;
//     component.ngOnInit(); // Simulate ngOnInit where subscription happens

//     component.subscription = mainContentServiceMock.onResetState.subscribe(() => {
//       triggered = true;
//     });

//     mainContentServiceMock.onResetState.emit(); // Trigger the emit

//     tick(); // Advance the fakeAsync clock

//     expect(triggered).toBeTrue();
//   }));

//   afterEach(() => {
//     // Cleanup to avoid memory leaks
//     if (component.subscription) {
//       component.subscription.unsubscribe();
//     }
//   });
// });
