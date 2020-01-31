import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbkComponentLibraryComponent } from './ibk-component-library.component';

describe('IbkComponentLibraryComponent', () => {
  let component: IbkComponentLibraryComponent;
  let fixture: ComponentFixture<IbkComponentLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbkComponentLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbkComponentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
