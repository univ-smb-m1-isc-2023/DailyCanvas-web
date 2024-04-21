import {EntryType} from "./entry-type";

export interface Challenge {
  id: number;
  idCreator: number;
  name: string;
  description: string;
  duration: number;
  interval: number;
  creationDate: Date;
  entryTypes: EntryType[];
  subscribeId?: number;
}
