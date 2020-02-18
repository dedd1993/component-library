import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { PagesService } from 'src/app/core/services/pages.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  @ViewChild('docContent') documentationContent: ElementRef;

  content = `<ibk-button>Default</ibk-button>
<ibk-button disabled="true">Disabled</ibk-button>`;

  constructor(
    private pagesService: PagesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(flatMap((data) => {
        return this.pagesService.getComponentDocumentation(data.componentName);
      }))
      .subscribe((component) => {
        this.documentationContent.nativeElement.innerHTML = `${component.htmlContent}`;
      });
  }

}
