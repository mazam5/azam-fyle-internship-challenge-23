import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve user from the API via GET', () => {
    const dummyUser = { login: 'john', id: 1 };
    service.getUser('john').subscribe(user => {
      expect(user).equal(dummyUser);
    });

    const request = httpMock.expectOne('https://api.github.com/users/johnpapa');
    expect(request.request.method).to('GET')
    request.flush(dummyUser);
  });


  it('should cache the user data', () => {
    const dummyUser = { login: 'john', id: 1 };
    service.getUser('john').subscribe();
    const request = httpMock.expectOne('https://api.github.com/users/john');
    request.flush(dummyUser);

    service.getUser('john').subscribe(user => {
      expect(user).equal(dummyUser);
    });

    httpMock.expectNone('https://api.github.com/users/john');
  });

  it('should cache the repos data', () => {
    const dummyRepos = [{ name: 'repo1' }, { name: 'repo2' }];
    service.getRepos('john', 1, 10).subscribe();
    const request = httpMock.expectOne('https://api.github.com/users/john/repos?page=1&per_page=10');
    request.flush(dummyRepos);

    service.getRepos('john', 1, 10).subscribe(repos => {
      expect(repos).equal(dummyRepos);
    });

    httpMock.expectNone('https://api.github.com/users/john/repos?page=1&per_page=10');
  });
});
