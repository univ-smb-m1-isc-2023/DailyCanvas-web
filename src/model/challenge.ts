import {type Entry} from "./entry";

export interface Challenge {
  id: number;
  idCreator: number;
  name: string;
  description: string;
  duration: number;
  interval: number;
  creationDate: Date;
  entryTypes: Entry[];
}
