import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable } from 'rxjs';

import { environment } from '@src/environments/environment';
import { BaseService } from '@app/core/services/base.service';
import { BaseRequestResult } from '@app/core/models/base-request-result.model';
import { TotemAccess } from '../models/totem-access.model';

@Injectable()
export class AccessService extends BaseService {
  totemMottuCityApi: string = environment.apiUrl.v2.totemMottuCity;

  constructor(private http: HttpClient) {
    super();
  }

  getAccess(id: number): Observable<TotemAccess> {
    return this.http
      .get<BaseRequestResult<TotemAccess>>(
        `${this.totemMottuCityApi}totemaccess/${id}`
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}
