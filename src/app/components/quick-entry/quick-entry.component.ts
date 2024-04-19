import {Component, Input, OnInit} from '@angular/core';
import {EntryTypeService} from "../../../services/entry-type/entry-type.service";
import {type Challenge} from "../../../model/challenge";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EntryType} from "../../../model/entry-type";
import {IconComponent} from "../../elements/icon/icon.component";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {ChallengeService} from "../../../services/challenge/challenge.service";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user/user.service";

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
export class QuickEntryComponent implements OnInit{
  challenges!: Challenge[];
  currentChallenge!: number;
  submittedAndInvalid: boolean = false;

  entryForm = new FormGroup({
    textResponse: new FormControl<string>(''),
    numberResponse: new FormControl<number>(1, {
      validators: [Validators.pattern(/^\d*\.?\d+$/)],
      nonNullable: true
    }),
    emojiResponse: new FormControl<EntryType | undefined>(undefined)
  });
  constructor(private entryTypeService: EntryTypeService, private challengeService: ChallengeService, private userService: UserService) {
  }
  async ngOnInit(): Promise<void> {
    if(this.userService.getLocalUser()){
      this.challenges = await this.getChallengesWithoutResponse()
    }
    this.currentChallenge = 0;
  }

  async getChallengesWithoutResponse(): Promise<Challenge[]>{
    return await this.challengeService.getAllChallengeWithoutResponseOfUser(this.userService.getLocalUser()!.id);
  }

  sendEntry(): void {
    console.log(this.entryForm)
    if(this.isEmojis() && !this.entryForm.value.emojiResponse){
      this.submittedAndInvalid = true;
    } else {
      if(this.entryForm.valid){
        console.log("cool")
      }
    }
  }

  isText(): boolean {
    if(this.challenges[this.currentChallenge]){
      return this.entryTypeService.entryTypesIsText(this.challenges[this.currentChallenge].entryTypes)
    }
    return false;
  }

  isNumber(): boolean {
    if(this.challenges[this.currentChallenge]){
      return this.entryTypeService.entryTypesIsNumber(this.challenges[this.currentChallenge].entryTypes);
    }
    return false;
  }

  isEmojis(): boolean {
    if(this.challenges[this.currentChallenge]){
      return this.entryTypeService.entryTypesIsEmoji(this.challenges[this.currentChallenge].entryTypes);
    }
    return false;
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
}
