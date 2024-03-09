import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {SubscribeChallenge} from "../../model/subscribe-challenge";

@Injectable({
  providedIn: 'root'
})
export class SubscribeChallengeService extends GenericService<SubscribeChallenge>{

  constructor() {
    super("subscribe-challenge");
  }
}
