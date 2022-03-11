import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRequestResult } from '@app/core/models/base-request-result.model';
import { Option } from '../models/option.model';
import { map, Observable } from 'rxjs';
import { BaseService } from '@app/core/services/base.service';
import { CreateAttendanceModel } from '../models/create-attendance-model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  validateClientByCpf(cpf: string): Observable<number> {
    return this.http
      .get<BaseRequestResult<number>>('')
      .pipe(map(super.extractData));
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
