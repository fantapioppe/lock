import { TestBed } from '@angular/core/testing';

import { MessaggieroService } from './messaggiero.service';

describe('MessaggieroService', () => {
  let service: MessaggieroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessaggieroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
