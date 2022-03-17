import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable } from 'rxjs';

import { environment } from '@src/environments/environment';
import { BaseService } from '@app/core/services/base.service';
import { BaseRequestResult } from '@app/core/models/base-request-result.model';
import { Option } from '../models/option.model';
import { CreateAttendanceModel } from '../models/create-attendance-model';
import { User } from '../../shared/models/user.model';
import { Attendance } from '@app/shared/models/attendance.model';

@Injectable()
export class MaintenanceService extends BaseService {
  totemMottuCityApi: string = environment.apiUrl.v2.totemMottuCity;

  constructor(private http: HttpClient) {
    super();
  }

  getOptions(optionId: number, branchId: number): Observable<Option[]> {
    return this.http
      .get<BaseRequestResult<Option[]>>(
        `${environment.apiUrl.v2.totemMottuCity}TotemSubServices/${optionId}/${branchId}`
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  getUser(cpf: string, optionId: number): Observable<User> {
    return this.http
      .get<BaseRequestResult<number>>(
        `${this.totemMottuCityApi}CheckUserTotemOption/${cpf}/${optionId}`
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  getSchedule(
    userId: number,
    optionId: number,
    branchId: number
  ): Observable<boolean> {
    return this.http
      .get<BaseRequestResult<boolean>>(
        `${this.totemMottuCityApi}UserHasActiveScheduling/${userId}/${optionId}/${branchId}`
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  postAttendance(
    createAttendanceModel: CreateAttendanceModel
  ): Observable<string> {
    return this.http
      .post<BaseRequestResult<CreateAttendanceModel>>(
        `${environment.apiUrl.v2.totemMottuCity}SaveTotemAttendance`,
        createAttendanceModel
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  getActiveAttendance(cpf: string): Observable<Attendance> {
    return this.http
      .get<BaseRequestResult<Attendance>>(
        `${environment.apiUrl.v2.totemMottuCity}LastUserActiveAttendance/${cpf}`
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  postChangeAttendance(
    changeAttendanceModel: CreateAttendanceModel
  ): Observable<string> {
    return this.http
      .post<BaseRequestResult<CreateAttendanceModel>>(
        `${environment.apiUrl.v2.totemMottuCity}ChangeTotemAttendance`,
        changeAttendanceModel
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}
