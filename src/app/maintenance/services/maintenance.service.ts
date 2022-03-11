import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable } from 'rxjs';

import { environment } from '@src/environments/environment';
import { BaseService } from '@app/core/services/base.service';
import { BaseRequestResult } from '@app/core/models/base-request-result.model';
import { Option } from '../models/option.model';
import { CreateAttendanceModel } from '../models/create-attendance-model';
import { User } from '../models/user';

@Injectable()
export class MaintenanceService extends BaseService {
  totemMottuCityApi: string = environment.apiUrl.v2.totemMottuCity;

  constructor(private http: HttpClient) {
    super();
  }

  getUser(cpf: string): Observable<User> {
    return this.http
      .get<BaseRequestResult<number>>(
        `${this.totemMottuCityApi}finduserbycpf/${cpf}`
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  getOptions(): Observable<Option[]> {
    return this.http
      .get<BaseRequestResult<Option[]>>('')
      .pipe(map(super.extractData));
  }

  getQuickOptions(): Observable<Option[]> {
    return this.http
      .get<BaseRequestResult<Option[]>>('')
      .pipe(map(super.extractData));
  }

  verifySchedule(
    clientId: number,
    scheduleTypeId: number
  ): Observable<boolean> {
    return this.http
      .get<BaseRequestResult<boolean>>('')
      .pipe(map(super.extractData));
  }

  createAttendance(
    createAttendanceModel: CreateAttendanceModel
  ): Observable<CreateAttendanceModel> {
    return this.http
      .post<BaseRequestResult<CreateAttendanceModel>>('', createAttendanceModel)
      .pipe(map(super.extractData));
  }
}
