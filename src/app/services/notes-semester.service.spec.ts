import { TestBed } from '@angular/core/testing';

import { NotesSemesterService } from './notes-semester.service';

describe('NotesSemesterService', () => {
  let service: NotesSemesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesSemesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
