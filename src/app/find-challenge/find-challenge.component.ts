import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";
import {Challenge} from "../../model/challenge";
import {ChallengeService} from "../../services/challenge/challenge.service";

@Component({
  selector: 'app-find-challenge',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './find-challenge.component.html',
  styleUrl: './find-challenge.component.css'
})
export class FindChallengeComponent implements OnInit {
  isLoading: boolean = false;
  challenges!: Challenge[];

  constructor(private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.challengeService.getAll()
      .then((challenges: Challenge[]) => {
        this.isLoading = false
        this.challenges = challenges;
      });
  }


}
