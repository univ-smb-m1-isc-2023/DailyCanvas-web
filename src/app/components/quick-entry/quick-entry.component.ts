import {Component, OnInit} from '@angular/core';
import {EntryTypeService} from "../../../services/entry-type/entry-type.service";
import {type Challenge} from "../../../model/challenge";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {type EntryType} from "../../../model/entry-type";
import {IconComponent} from "../../elements/icon/icon.component";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {ChallengeService} from "../../../services/challenge/challenge.service";
import {UserService} from "../../../services/user/user.service";
import {EntryService} from "../../../services/entry/entry.service";
import {type Entry} from "../../../model/entry";
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-quick-entry',
  standalone: true,
  imports: [
    IconComponent,
    NgClass,
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './quick-entry.component.html',
  styleUrl: './quick-entry.component.css'
})
export class QuickEntryComponent implements OnInit {
  challengeToAnswer!: number;
  challengeAnswered!: number;
  challenges!: Challenge[];
  currentChallenge!: number;

  entryForm = new FormGroup({
    textResponse: new FormControl<string>(''),
    numberResponse: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^\d*\.?\d+$/)]
    }),
    emojiResponse: new FormControl<EntryType | undefined>(undefined)
  });
  constructor(private entryTypeService: EntryTypeService, private entryService: EntryService, private challengeService: ChallengeService, private userService: UserService) {
  }
  async ngOnInit(): Promise<void> {
    if(this.userService.getLocalUser()){
      this.challenges = await this.getChallengesWithoutResponse()
      this.challengeToAnswer = this.challenges.length;
      this.challengeAnswered = 0;
    }
    this.currentChallenge = 0;
  }

  async getChallengesWithoutResponse(): Promise<Challenge[]>{
    return await this.challengeService.getAllChallengeWithoutResponseOfUser(this.userService.getLocalUser()!.id);
  }


  sendEntry(): void {
    this.entryService.checkErrors(this.entryForm, this.challenges[this.currentChallenge]);

    if(this.entryForm.valid){
      const entry: Omit<Entry, "id"> = {
        idEntryType: this.isEmojis() ? this.entryForm.value.emojiResponse!.id : this.challenges[this.currentChallenge].entryTypes[0].id,
        value: this.isEmojis() ? null : (this.isText() ? this.entryForm.value.textResponse! : this.entryForm.value.numberResponse!.toString()),
        date: new Date(),
        idSubscribeChallenge: this.challenges[this.currentChallenge].subscribeId!
      }
      this.entryService.create(entry)
        .then(() => {
          this.entryForm.reset();
          this.challengeAnswered++;
          this.challenges = this.challenges!.filter((challenge_in: Challenge) => challenge_in !== this.challenges[this.currentChallenge]);
          this.nextChallenge();
          if (this.challenges.length === 0) {
            this.celebrate();
            setInterval(async () => {
              this.challenges = await this.getChallengesWithoutResponse();
              this.challengeToAnswer = this.challenges.length;
              this.currentChallenge = 0;
              this.challengeAnswered = 0;
            }, 5000)
          }
        })
        .catch((e) => console.log("error : ", e))
    }
  }

  nextChallenge(): void{
    if (this.challenges.length > this.currentChallenge + 1) {
      this.currentChallenge++;
    } else {
      this.currentChallenge = 0;
    }
  }

  updateEmojisUnique(emoji: EntryType): void{
    if(this.entryForm.value.emojiResponse){
      if(this.emojiSelected(emoji)){
        this.entryForm.value.emojiResponse = undefined;
      } else {
        this.entryForm.value.emojiResponse = emoji;
      }
    } else {
      this.entryForm.value.emojiResponse = emoji;
    }
  }

  emojiSelected(emoji: EntryType): boolean {
    return this.entryForm.value.emojiResponse === emoji;
  }

  celebrate(){
    const duration = 5000; // in milliseconds

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
    });

    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  }

  isText(): boolean {
    return this.entryService.isText(this.challenges[this.currentChallenge]);
  }

  isNumber(): boolean {
    return this.entryService.isNumber(this.challenges[this.currentChallenge]);
  }

  isEmojis(): boolean {
    return this.entryService.isEmojis(this.challenges[this.currentChallenge]);
  }
}
