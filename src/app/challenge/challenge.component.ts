import {Component, Input} from '@angular/core';
import {type Challenge} from "../../model/challenge";
import {EntryTypeService} from "../../services/entry-type/entry-type.service";
import {IconComponent} from "../elements/icon/icon.component";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [
    IconComponent,
    NgFor,
    NgIf
  ],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.css'
})
export class ChallengeComponent {
  @Input() challenge!: Challenge;
  @Input() disabled!: boolean;

  constructor(private entryTypeService: EntryTypeService) {
  }

  timeToString(time: number): string{
    return time + ' jours';
  }

  isText(){
    return this.entryTypeService.entryTypesIsText(this.challenge.entryTypes);
  }

  isNumber(){
    return this.entryTypeService.entryTypesIsNumber(this.challenge.entryTypes);
  }

  isEmojis(){
    return this.entryTypeService.entryTypesIsEmoji(this.challenge.entryTypes);
  }
}
