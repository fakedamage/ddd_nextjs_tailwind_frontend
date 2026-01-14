
export enum LeadNeedEnum {
  INSTITUTIONAL_FILMS = "INSTITUTIONAL_FILMS",
  CORPORATE_EVENTS = "CORPORATE_EVENTS",
  CONTENT_FILMS = "CONTENT_FILMS",
}

export const LEAD_NEED_ENUM_LABELS: Record<string, string> = {
  [LeadNeedEnum.INSTITUTIONAL_FILMS]: "Filmes Institucionais",
  [LeadNeedEnum.CORPORATE_EVENTS]: "Eventos Corporativos",
  [LeadNeedEnum.CONTENT_FILMS]: "Filmes de Conteúdo",
};

