import {Component, OnInit} from '@angular/core';
import {type Challenge} from "../../../model/challenge";
import {ChallengeService} from "../../../services/challenge/challenge.service";
import {NgFor, NgIf} from "@angular/common";
import {ChallengeComponent} from "../../challenge/challenge.component";
import {UserService} from "../../../services/user/user.service";
import {type User} from "../../../model/user";

@Component({
  selector: 'app-find-challenge',
  standalone: true,
    imports: [NgFor, NgIf, ChallengeComponent],
  templateUrl: './find-challenge.component.html',
  styleUrl: './find-challenge.component.css'
})
export class FindChallengeComponent implements OnInit {
  isLoading: boolean = false;
  challenges!: Challenge[];
  userChallenges: Challenge[] = [];
  user!: User | undefined;

  constructor(private challengeService: ChallengeService, private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getLocalUser();
    this.isLoading = true;
    this.challenges = await this.challengeService.getAll();
    if(this.user){
      this.userChallenges = await this.challengeService.getAllChallengeSubscribeOfUser(this.user.id)
    }
    this.isLoading = false
  }

  async subscribe(challenge: Challenge): Promise<void>{
    if(!this.userIsSubscribe(challenge) && this.user){
      await this.challengeService.subscribeUserToChallenge({challengeId: challenge.id, userId: this.user.id})
      this.userChallenges.push(challenge);
    }
  }

  unsubscribe(challenge: Challenge){
    console.log("unsubscribe", challenge.name)
  }

  userIsSubscribe(challenge: Challenge): boolean {
    return this.userChallenges.filter((c: Challenge) => challenge.id === c.id).length > 0;
  }

  getModal(index: number): HTMLDialogElement{
    return <HTMLDialogElement>document.getElementById("subscribe_" + index);
  }
}
