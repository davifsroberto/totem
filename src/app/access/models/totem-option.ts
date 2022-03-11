import { OfficeHours } from './office-hours';

export interface TotemOption {
  optionId: number;
  branchId: number;
  officeHours: OfficeHours;
}
