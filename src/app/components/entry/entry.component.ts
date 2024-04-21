import {Component, Input} from '@angular/core';
import {type Challenge} from "../../../model/challenge";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EntryType} from "../../../model/entry-type";
import {EntryTypeService} from "../../../services/entry-type/entry-type.service";
import {Entry} from "../../../model/entry";
import {EntryService} from "../../../services/entry/entry.service";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {IconComponent} from "../../elements/icon/icon.component";

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass, IconComponent],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent {
  @Input() challenge!: Challenge;
  entryForm = new FormGroup({
    textResponse: new FormControl<string>(''),
    numberResponse: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^\d*\.?\d+$/)]
    }),
    emojiResponse: new FormControl<EntryType | undefined>(undefined)
  });

  constructor(private entryService: EntryService) {
  }



  sendEntry(): void {
    this.entryService.checkErrors(this.entryForm, this.challenge);

    if(this.entryForm.valid){
      const entry: Omit<Entry, "id"> = {
        idEntryType: this.isEmojis() ? this.entryForm.value.emojiResponse!.id : this.challenge.entryTypes[0].id,
        value: this.isEmojis() ? null : (this.isText() ? this.entryForm.value.textResponse! : this.entryForm.value.numberResponse!.toString()),
        date: new Date(),
        idSubscribeChallenge: this.challenge.subscribeId!
      }
      this.entryService.create(entry)
        .then(() => this.entryForm.reset())
        .catch((e) => console.log("error : ", e))
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

  isText(): boolean {
    return this.entryService.isText(this.challenge);
  }

  isNumber(): boolean {
    return this.entryService.isNumber(this.challenge);
  }

  isEmojis(): boolean {
    return this.entryService.isEmojis(this.challenge);
  }
}
