import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChallengeService} from "../../../services/challenge/challenge.service";
import {type Challenge} from "../../../model/challenge";
import {NgIf} from "@angular/common";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-create-challenge',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-challenge.component.html',
  styleUrl: './create-challenge.component.css'
})
export class CreateChallengeComponent implements AfterViewInit{
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
      validators: [Validators.required, Validators.pattern(/^\d*\.?\d+$/)],
      nonNullable: true
    }),
    interval: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.pattern(/^\d*\.?\d+$/)],
      nonNullable: true
    }),
  });
  constructor(private challengeService: ChallengeService,private renderer: Renderer2, private elRef: ElementRef) { }
  ngAfterViewInit(): void {
    const hostElement = this.elRef.nativeElement;
    this.renderer.setStyle(hostElement, 'flex-grow', '1');
  }

  createChallenge(){
    console.log(this.challengeForm)
    if(this.challengeForm.status === "VALID"){
      this.submittedAndInvalid = false;
      const challenge: Omit<Challenge, "id"> = {
        idCreator: 5, //TODO récupérer l'id dans le local store
        creationDate: new Date(),
        description: <string>this.challengeForm.value.description,
        duration: Number(this.challengeForm.value.duration),
        interval: Number(this.challengeForm.value.interval),
        name: <string>this.challengeForm.value.name
      };
      this.challengeService.create(challenge).then(() => this.challengeForm.reset())
    } else {
      this.submittedAndInvalid = true;
    }
  }
}
