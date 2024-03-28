import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {EntryType} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class EntryTypeService extends GenericService<EntryType>{

  constructor() {
    super('entry-type');
  }
}
