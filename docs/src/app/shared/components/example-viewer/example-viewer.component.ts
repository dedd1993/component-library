import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss']
})
export class ExampleViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('wrapperOfDOM') wrapperOfDOM: ElementRef;

  htmlContent: string;

  @Input() set content(value) {
    this.htmlContent = value;

    if (this.wrapperOfDOM) {
      this.wrapperOfDOM.nativeElement.innerHTML = value;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.wrapperOfDOM.nativeElement.innerHTML = this.htmlContent;
  }

}
