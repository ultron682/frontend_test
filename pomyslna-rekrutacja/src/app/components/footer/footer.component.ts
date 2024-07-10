import { Component, OnInit, Output, EventEmitter, } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() showPersonalDataEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  resetContent() {
    localStorage.clear();
    location.reload();
  }

  showName() {
    this.showPersonalDataEmitter.emit();
  }


}
