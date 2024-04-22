import {Component, OnInit} from '@angular/core';
import {ChallengeService} from "../../../services/challenge/challenge.service";
import {UserService} from "../../../services/user/user.service";
import {type Challenge} from "../../../model/challenge";
import {ChallengeComponent} from "../challenge.component";
import {NgFor, NgIf} from "@angular/common";
import {FloatingNavComponent, NavElement} from "../../elements/floating-nav/floating-nav.component";
import {EntryComponent} from "../../components/entry/entry.component";

@Component({
  selector: 'app-my-challenge',
  standalone: true,
  imports: [
    ChallengeComponent,
    NgFor,
    NgIf,
    FloatingNavComponent,
    EntryComponent
  ],
  templateUrl: './my-challenge.component.html',
  styleUrl: './my-challenge.component.css'
})
export class MyChallengeComponent implements OnInit {
  isLoading: boolean = false;
  challenges: Challenge[] = [];
  redirectLinks: NavElement[] = [
    {
      name: "Créer un défi",
      link: "/challenge/create"
    },
    {
      name: "Trouver un défi",
      link: "/challenges"
    }
  ];
  constructor(private challengeService: ChallengeService, private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.getAllChallengeSubscribeOfUser();
    this.isLoading = false;
  }

  async getAllChallengeSubscribeOfUser() {
    const userId: number | undefined = this.userService.getLocalUser()?.id;
    if (userId) {
      this.challenges = await this.challengeService.getAllChallengeSubscribeOfUser(userId)
    }
  }

  unsubscribe(challenge: Challenge){
    console.log("unsubscribe", challenge.name)
  }

  getModalDelete(index: number): HTMLDialogElement{
    return <HTMLDialogElement>document.getElementById("delete_" + index);
  }
  getModalEntry(index: number): HTMLDialogElement{
    return <HTMLDialogElement>document.getElementById("entry_" + index);
  }

  closeModalEntry = (index: number): void => { this.getModalEntry(index).close();}
}
