import { Component, Input, ViewChild, ElementRef, ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: true }) sidenavElement: ElementRef;
  @ViewChild('wrapperContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  @Input() open;
  @Input() set fixed(value: boolean) {
    setTimeout(() => {
      this.sidenavElement.nativeElement.classList.add(`collapsing`);
      this.isFixed = value;
    }, 350);

    setTimeout(() => {
      this.sidenavElement.nativeElement.classList.remove('collapsing');
    }, 1000);
  }

  isFixed = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setListenersForSubmenus();
  }

  slideToggle(element) {
    if (element.style.height === '0px') {
      element.style.height = element.parentElement.getAttribute('default-height') + 'px';
    } else {
      element.style.height = 0;
    }
  }

  private setListenersForSubmenus() {
    const submenuArray = this.sidenavElement.nativeElement.querySelectorAll('.submenu');
    const itemArray = this.sidenavElement.nativeElement.querySelectorAll('dl:not(.submenu) dt');

    itemArray.forEach(item => {
      item.addEventListener('click', (e) => {
        submenuArray.forEach(submenu => {
          submenu.classList.remove('open');
          submenu.querySelector('dd').style.height = 0;
        });
      });
    });

    if (submenuArray.length > 0) {
      submenuArray.forEach(submenu => {
        const submenuGroupWrapper = submenu.querySelector('dd');

        if (submenuGroupWrapper) {
          submenu.setAttribute('default-height', submenuGroupWrapper.clientHeight);
          submenuGroupWrapper.style.height = 0;

          submenu.querySelector('dt').addEventListener('click', (e) => {
            submenu.classList.toggle('open');
            this.slideToggle(submenuGroupWrapper);

            [].slice
              .call(submenuArray)
              .filter( sm => sm !== submenu )
              .map((sibiling) => {
                sibiling.querySelector('dd').style.height = 0;
                sibiling.classList.remove('open');
              });
          });
        }
      });
    }
  }

}
