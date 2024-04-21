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
    }
    this.currentChallenge = 0;
  }

  async getChallengesWithoutResponse(): Promise<Challenge[]>{
    return await this.challengeService.getAllChallengeWithoutResponseOfUser(this.userService.getLocalUser()!.id);
  }

  checkErrors(): void{
    if(this.isText() && !this.entryForm.value.textResponse){
      this.entryForm.get('textResponse')?.setErrors({required: "TextResponse is required"})
    } else {
      this.entryForm.get('textResponse')?.setErrors(null)
    }
    if(this.isNumber() && !this.entryForm.value.numberResponse){
      this.entryForm.get('numberResponse')?.setErrors({required: "NumberResponse is required"})
    } else {
      this.entryForm.get('numberResponse')?.setErrors(null)
    }
    if(this.isEmojis() && !this.entryForm.value.emojiResponse){
      this.entryForm.get('emojiResponse')?.setErrors({required: "EmojiResponse is required"})
    } else {
      this.entryForm.get('emojiResponse')?.setErrors(null)
    }
  }

  sendEntry(): void {
    this.checkErrors();

    if(this.entryForm.valid){
      const entry: Omit<Entry, "id"> = {
        idEntryType: this.isEmojis() ? this.entryForm.value.emojiResponse!.id : this.challenges[this.currentChallenge].entryTypes[0].id,
        value: this.isEmojis() ? null : (this.isText() ? this.entryForm.value.textResponse! : this.entryForm.value.numberResponse!.toString()),
        date: new Date(),
        idSubscribeChallenge: this.challenges[this.currentChallenge].subscribeId!
      }
      this.entryService.create(entry)
        .then(async () => {
          this.entryForm.reset();
          if (this.challenges.length > this.currentChallenge + 1) {
            this.currentChallenge++;
          } else {
            this.challenges = await this.getChallengesWithoutResponse();
            this.currentChallenge = 0;
          }
        })
        .catch((e) => console.log("error : ", e))
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
