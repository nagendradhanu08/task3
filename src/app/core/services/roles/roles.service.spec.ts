import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { RolesService } from './roles.service';
import { Role } from '../../model/roles.model';
import { Response } from '../../model/response.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('RolesService', () => {
  let service: RolesService;
  let httpMock: HttpTestingController;

  let response: Response = {
    status: 1,
    message: '',
    errors: {},
    result: {}
  };
  let roles: Role[] = [
    { Id: '1', Name: 'role1', Description: 'Description1' },
    { Id: '2', Name: 'role2', Description: 'Description2' },
    { Id: '3', Name: 'role3', Description: 'Description3' }
  ];
  let role: Role = { Id: '2', Name: 'role2', Description: 'Description2' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RolesService]
    });
    service = TestBed.get(RolesService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    response = { status: 0, message: '', errors: {}, result: {} };
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should contain getRoles()', () => {
    expect(service.getRoles).toBeTruthy();
  });
  it('should contain getRole()', () => {
    expect(service.getRole).toBeTruthy();
  });
  it('should contain createRole()', () => {
    expect(service.createRole).toBeTruthy();
  });
  it('should contain saveRole()', () => {
    expect(service.saveRole).toBeTruthy();
  });
  it('should contain deleteRole()', () => {
    expect(service.deleteRole).toBeTruthy();
  });
  it('should get the roles form API', () => {
    response.result = role;

    service.getRoles().subscribe(response => {
      expect(response.result).toEqual(response.result);
    });

    const request = httpMock.expectOne(`${service.baseUrl}roles`);

    expect(request.request.method).toBe('GET');
    expect(request.request.url.split('/').indexOf(`roles`)).toBeGreaterThan(0);
    request.flush(response);

  });

  it('should get the role data for given id(2)', () => {
    let id = 2;
    response.result = role;

    service.getRole(id).subscribe(reseponse => {
      expect(reseponse.result).toEqual(role);
    });

    const request = httpMock.expectOne(`${service.baseUrl}roles/${id}`);
    expect(request.request.method).toBe('GET');
    expect(request.request.url.split('/').indexOf(`roles`)).toBeGreaterThan(0);
    expect(request.request.url.split('/').indexOf(`${id}`)).toBeGreaterThan(0);
    request.flush(response);

    // expect(role.id).toBe(id);
  });

  it('should add the role data for given role', () => {
    let newRole: Role = { Id: '4', Name: 'userRole4', Description: 'userRole4 Description' };

    service.createRole(newRole).subscribe(response => {
      expect(response.result).toEqual(newRole);
    });

    const request = httpMock.expectOne(`${service.baseUrl}roles`);
    expect(request.request.method).toBe('POST');
    expect(request.request.url.split('/').indexOf(`roles`)).toBeGreaterThan(0);
  });

  it('should update the role data for given role id', () => {
    let Id = '2';
    let updatedRole: Role = { Id: '2', Name: 'userRole4', Description: 'userRole4 Description' };

    service.saveRole(Id, updatedRole).subscribe(response => {
      expect(response.result).toEqual(updatedRole);
    });

    const request = httpMock.expectOne(`${service.baseUrl}roles/${Id}`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.url.split('/').indexOf(`roles`)).toBeGreaterThan(0);
    expect(request.request.url.split('/').indexOf(`${Id}`)).toBeGreaterThan(0);
  });

  it('should delete the role data for given id(2)', () => {
    let id = '2';
    response.status = 0;

    service.deleteRole(id).subscribe(response => {
      expect(response.status).toBe(0);
    });

    const request = httpMock.expectOne(`${service.baseUrl}role/${id}`);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.url.split('/').indexOf(`role`)).toBeGreaterThan(0);
    expect(request.request.url.split('/').indexOf(`${id}`)).toBeGreaterThan(0);
    request.flush(response);
  });

  it('should call errorHandler when request gets fail', () => {
    let id = '2';

    service.getRole(id).subscribe(response => {
      console.log(true);
    }, err => {
      expect(err).toBe('Something bad happened; please try again later.');
      console.log(err);
    })

    const request = httpMock.expectOne(`${service.baseUrl}roles/${id}`);
    request.flush(request, { status: 400, statusText: 'Bad request' });
  })
});
