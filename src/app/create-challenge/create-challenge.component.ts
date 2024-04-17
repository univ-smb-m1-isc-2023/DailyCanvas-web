import {Component} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChallengeService} from "../../services/challenge/challenge.service";
import {type Challenge} from "../../model/challenge";
import {NgFor, NgIf} from "@angular/common";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-create-challenge',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './create-challenge.component.html',
  styleUrl: './create-challenge.component.css'
})
export class CreateChallengeComponent {
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
  submittedAndInvalid: boolean = false;
  challengeForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    duration: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^\d*\.?\d+$/)],
      nonNullable: false
    }),
    interval: new FormControl<number | null>(null, {
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
    })
  });
  constructor(private challengeService: ChallengeService, private userService: UserService) { }

  createChallenge(){
    console.log(this.challengeForm)
    if(this.challengeForm.value.duration_unit === this.duration_units[0]){
      this.challengeForm.value.duration = 0;
    }
    if(this.challengeForm.status === "VALID" && this.userService.getLocalUser()){
      this.submittedAndInvalid = false;
      const challenge: Omit<Challenge, "id"> = {
        idCreator: this.userService.getLocalUser()!.id,
        creationDate: new Date(),
        description: <string>this.challengeForm.value.description,
        duration: Number(this.challengeForm.value.duration),
        interval: Number(this.challengeForm.value.interval),
        name: <string>this.challengeForm.value.name,
        entryTypes: []
      };
      this.challengeService.create(challenge).then((challenge: Challenge) => {
        this.challengeForm.reset()
        console.log(challenge);
      })
    } else {
      this.submittedAndInvalid = true;
    }
  }
}
