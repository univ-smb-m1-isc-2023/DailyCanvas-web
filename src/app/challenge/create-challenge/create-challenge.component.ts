import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChallengeService} from "../../../services/challenge/challenge.service";
import {type Challenge} from "../../../model/challenge";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {UserService} from "../../../services/user/user.service";
import {EntryTypeService} from "../../../services/entry-type/entry-type.service";
import {type EntryType} from "../../../model/entry-type";
import {IconComponent} from "../../elements/icon/icon.component";
import {FloatingNavComponent, NavElement} from "../../elements/floating-nav/floating-nav.component";

@Component({
  selector: 'app-create-challenge',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    IconComponent,
    NgClass,
    FloatingNavComponent
  ],
  templateUrl: './create-challenge.component.html',
  styleUrl: './create-challenge.component.css'
})
export class CreateChallengeComponent implements OnInit {
  redirectLinks: NavElement[] = [
    {
      name: "Mes défis",
      link: "/challenge/my"
    },
    {
      name: "Trouver un défi",
      link: "/challenges"
    }
  ];
  exemple_emojis_select: EntryType | undefined = undefined
  emojis!: EntryType[];
  emojis_basic!: EntryType[];
  duration_units = [
    {name: "une durée indéterminée"},
    {name: "jours"},
    {name: "mois"},
    {name: "années"},
    {name: "minutes"},
    {name: "heures"}
  ];
  interval_units = [
    {name: "jours"},
    {name: "mois"},
    {name: "années"},
    {name: "minutes"},
    {name: "heures"}
  ];

  entry_types = [
    {name :"Quel type de réponse voulez-vous utiliser ?", disabled: true},
    {name: "Texte"},
    {name: "Nombre"},
    {name: "Émojis"},
    {name: "Émojis personnalisés"}
  ];

  submittedAndInvalid: boolean = false;
  entryTypeErrors: string[] = [];
  challengeForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    duration: new FormControl<number | null>(1  , {
      validators: [Validators.pattern(/^\d*\.?\d+$/)],
      nonNullable: false
    }),
    interval: new FormControl<number | null>(1, {
      validators: [Validators.required, Validators.pattern(/^\d*\.?\d+$/)],
      nonNullable: true
    }),
    duration_unit: new FormControl(this.duration_units[0], {
      validators: [Validators.required],
      nonNullable: true
    }),
    interval_unit: new FormControl(this.interval_units[0], {
      validators: [Validators.required],
      nonNullable: true
    }),
    entry_type: new FormControl(this.entry_types[0], {
      validators: [Validators.required],
      nonNullable: true
    }),
    emojis: new FormControl<EntryType[]>([], {
      nonNullable: true
    })
  });
  constructor(private challengeService: ChallengeService, private userService: UserService, private entryTypesService: EntryTypeService) { }
  async ngOnInit(): Promise<void> {
    this.emojis = await this.entryTypesService.getEmojis();
    this.emojis_basic = [
      this.emojis[0],
      this.emojis[20],
      this.emojis[6],
      this.emojis[2],
      this.emojis[1]
    ]
  }
  createChallenge(){
    if(this.challengeForm.value.duration_unit === this.duration_units[0]){
      this.challengeForm.value.duration = 0;
    }
    const entryTypes: EntryType[] = this.getEntryTypesSelected();
    if(this.challengeForm.status === "VALID" && this.userService.getLocalUser() && this.entryTypeErrors.length === 0){
      this.submittedAndInvalid = false;
      const challenge: Omit<Challenge, "id"> = {
        idCreator: this.userService.getLocalUser()!.id,
        creationDate: new Date(),
        description: <string>this.challengeForm.value.description,
        duration: Number(this.challengeForm.value.duration),
        interval: Number(this.challengeForm.value.interval),
        name: <string>this.challengeForm.value.name,
        entryTypes: entryTypes
      };
      this.challengeService.createAndSubscribe(challenge).then((challenge: Challenge) => {
        this.challengeForm.reset();
        console.log(challenge);
      })
    } else {
      this.submittedAndInvalid = true;
    }
  }

  getEntryTypesSelected(): EntryType[] {
    this.entryTypeErrors = [];
    switch (this.challengeForm.value.entry_type) {
      case this.entry_types[0]:
        this.submittedAndInvalid = true;
        this.entryTypeErrors.push("Sélectionnez un type d'entrée");
        return [];
      case this.entry_types[1]:
        return [{ id: 2, value: "Texte" }];
      case this.entry_types[2]:
        return [{ id: 3, value: "Nombre" }];
      case this.entry_types[3]:
        return this.emojis_basic;
      case this.entry_types[4]:
        if(this.challengeForm.value.emojis && this.challengeForm.value.emojis?.length > 0){
          return this.challengeForm.value.emojis;
        }
        this.submittedAndInvalid = true;
        this.entryTypeErrors.push("Sélectionnez au moins un émoji");
        return [];
      default:
        this.submittedAndInvalid = true;
        this.entryTypeErrors.push("Ce type d'entrée n'existe pas");
        return [];
    }
  }

  updateEmojis(emoji: EntryType){
    if(this.challengeForm.value.emojis!.includes(emoji)){
      this.challengeForm.value.emojis = this.challengeForm.value.emojis!.filter((emoji_in: EntryType) => emoji_in !== emoji);
    } else {
      this.challengeForm.value.emojis!.push(emoji)
    }
  }

  updateEmojisUnique(emoji: EntryType){
    if(this.exemple_emojis_select){
      if(this.exemple_emojis_select === emoji){
        this.exemple_emojis_select = undefined;
      } else {
        this.exemple_emojis_select = emoji;
      }
    } else {
      this.exemple_emojis_select = emoji;
    }
  }

  emojiSelected(emoji: EntryType): boolean {
    return this.challengeForm.value.emojis!.includes(emoji);
  }
}
