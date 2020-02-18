import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private httpNoInterceptor: HttpClient;
  private manifestFormated: any[];

  constructor(
    private handler: HttpBackend
  ) {
    this.httpNoInterceptor = new HttpClient(handler);
  }

  getDocPages(): Observable<any> {
    if (this.manifestFormated) {
      return of(this.manifestFormated);
    }

    return this.httpNoInterceptor.get('assets/wc.manifest.json')
      .pipe(
        tap((data: any[]) => {
          this.manifestFormated = data.map(component => ({
            ...component,
            routerLink: component.title.toLowerCase().replace(' ', '-')
          }));
        }),
        map(data => this.manifestFormated)
      );
  }

  getRoutingPaths(): Observable<any> {
    return this.getDocPages()
      .pipe(
        delay(0),
        map((data: any[]) => {
          return data.map(component => ({
            routerLink: component.routerLink,
            routerLabel: component.title,
          }));
        })
      );
  }

  getComponentDocumentation(route: string): Observable<any> {
    return this.getDocPages()
      .pipe(
        map((manifest: any[]) => {
          return manifest.find(component => component.routerLink === route);
        })
      );
  }

}
