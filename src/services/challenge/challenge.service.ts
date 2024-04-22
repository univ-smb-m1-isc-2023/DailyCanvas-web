import { Injectable } from '@angular/core';
import {GenericService} from "../GenericService";
import {Challenge} from "../../model/challenge";
import axios from "axios";
import {API_URL} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends GenericService<Challenge>{

  constructor() {
    super('challenge');
  }

  async subscribeUserToChallenge(params: {challengeId: number, userId: number}){
    const response = await axios.post(`${API_URL}/${this.url}/subscribe`, params);
    return response.data;
  }

  async createAndSubscribe(challenge: Omit<Challenge, "id">){
    const response = await axios.post(`${API_URL}/${this.url}/create-and-subscribe`, challenge);
    return response.data;
  }

  async getAllChallengeSubscribeOfUser(idUser: number): Promise<Challenge[]>{
    const response = await axios.get(`${API_URL}/${this.url}/get-all-subscribe/${idUser}`);
    return response.data;
  }

  async getAllChallengeWithoutResponseOfUser(idUser: number): Promise<Challenge[]>{
    const response = await axios.get(`${API_URL}/${this.url}/no-response-of-user/${idUser}`);
    return response.data;
  }

  timeToString(time: number): string{
    return time + ' jours';
  }
}
