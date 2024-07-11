import { Component, OnInit } from '@angular/core';
import { MainContentService } from '../../services/main-content.service';

@Component({
  selector: 'app-main-tools',
  templateUrl: './main-tools.component.html',
  styleUrls: ['./main-tools.component.scss']
})
export class MainToolsComponent implements OnInit {
  content: string = '';

  constructor(private contentService: MainContentService) { }

  ngOnInit() {
  }

  replaceContent() {

  }

  appendContent() {
    this.contentService.appendContent('asdasd');
  }
}
