export interface Note {
  uuid: string;
  content: string;
  dateModified: string;
  dateCreated: string;
  dateSync: string; // Server Date
  synchronized: boolean;
  deleted: boolean;
}
