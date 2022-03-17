export interface Option {
  id: number;
  descricao: string;
  totemOpcaoPaiId: number;
  ordem: number;
  deletado: boolean;
  icone: string;
  totemOpcaoFilhos: Option[];
  horarioExpediente: OfficeHours;
}

export interface OfficeHours {
  inicio: string;
  fim: string;
  semExpediente: boolean;
}
