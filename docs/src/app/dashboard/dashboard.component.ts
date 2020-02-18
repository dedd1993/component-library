import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { PagesService } from '../core/services/pages.service';
import { finalize } from 'rxjs/operators';

const WIDTH_FOR_RESPONSIVE = 1280;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSidenavOpen = true;
  isSidenavFixed = false;
  isMenuLoaded = false;
  componentRouterList: any[];
  static path = () => ['dashboard'];

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.applyResponsiveIfNeed(event.target.innerWidth);
  }

  constructor(
    private elementRef: ElementRef,
    private pagesService: PagesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.requestForComponents();
  }

  ngOnInit() {
    this.applyResponsiveIfNeed(window.innerWidth);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

  toggleFullscreen() {
    const elem = this.elementRef.nativeElement.querySelector('.dashboard');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }

  onToggeleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  private applyResponsiveIfNeed(windowsWidth: number) {
    if (windowsWidth <= WIDTH_FOR_RESPONSIVE) {
      this.isSidenavOpen = false;
      this.isSidenavFixed = true;
    } else {
      this.isSidenavOpen = true;
      this.isSidenavFixed = false;
    }
  }

  private requestForComponents() {
    this.pagesService.getRoutingPaths()
      .pipe(finalize(() => this.isMenuLoaded = true))
      .subscribe(data => {
        this.componentRouterList = data;
      });
  }
}
