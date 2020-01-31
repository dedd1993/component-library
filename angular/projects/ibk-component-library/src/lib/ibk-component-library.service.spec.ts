import { TestBed } from '@angular/core/testing';

import { IbkComponentLibraryService } from './ibk-component-library.service';

describe('IbkComponentLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IbkComponentLibraryService = TestBed.get(IbkComponentLibraryService);
    expect(service).toBeTruthy();
  });
});
