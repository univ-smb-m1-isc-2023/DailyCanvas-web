import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {Entry} from "../../model/entry";

@Injectable({
  providedIn: 'root'
})
export class EntryService extends GenericService<Entry>{

  constructor() {
    super('entry');
  }
}
