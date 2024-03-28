import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChallengeService} from "../../services/challenge/challenge.service";
import {Challenge} from "../../model/challenge";
import {NgIf} from "@angular/common";

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
  challengeForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required]
    }),
    description: new FormControl<string>('', Validators.required),
    duration: new FormControl<number>(0, Validators.required),
    interval: new FormControl<number>(0, Validators.required),
  });
  constructor(private challengeService: ChallengeService,private renderer: Renderer2, private elRef: ElementRef) { }
  ngAfterViewInit(): void {
    const hostElement = this.elRef.nativeElement;
    this.renderer.setStyle(hostElement, 'flex-grow', '1');
  }

  test(){
    console.log(this.challengeForm)
    // const challenge: Omit<Challenge, "id"> = {
    //   idCreator: 5,
    //   creationDate: new Date(),
    //   description: this.challengeForm.value.description,
    //   duration: this.challengeForm.value.duration,
    //   interval: this.challengeForm.value.interval,
    //   name: this.challengeForm.value.name
    // };
    //this.challengeService.create(challenge)
  }
}
