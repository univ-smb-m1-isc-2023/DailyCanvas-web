import { Component } from '@angular/core';
import {EntryComponent} from "../components/entry/entry.component";
import {ChallengeComponent} from "../challenge/challenge.component";
import {Challenge} from "../../model/challenge";
import {ChallengeService} from "../../services/challenge/challenge.service";
import {UserService} from "../../services/user/user.service";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-add-entry',
  standalone: true,
  imports: [
    EntryComponent,
    ChallengeComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './add-entry.component.html',
  styleUrl: './add-entry.component.css'
})
export class AddEntryComponent {
  isLoading: boolean = false;
  challenges: Challenge[] = [];
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

  getModalEntry(index: number): HTMLDialogElement{
    return <HTMLDialogElement>document.getElementById("entry_" + index);
  }

  closeModalEntry = (index: number): void => { this.getModalEntry(index).close();}
}
