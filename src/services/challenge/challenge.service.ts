import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {Challenge} from "../../model/challenge";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends GenericService<Challenge>{

  constructor() {
    super('challenge');
  }
}
