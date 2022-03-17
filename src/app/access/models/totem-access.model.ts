import { OfficeHours } from '@app/maintenance/models/option.model';

export interface TotemAccess {
  id: number;
  lugarId: number;
  totemId: number;
  totemOpcaoId: number;
  horarioExpediente: OfficeHours;
}
