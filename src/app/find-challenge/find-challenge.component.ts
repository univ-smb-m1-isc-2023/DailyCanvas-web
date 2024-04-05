import {Component, OnInit} from '@angular/core';
import {NgFor} from "@angular/common";
import {Challenge} from "../../model/challenge";
import {ChallengeService} from "../../services/challenge/challenge.service";

@Component({
  selector: 'app-find-challenge',
  standalone: true,
  imports: [NgFor],
  templateUrl: './find-challenge.component.html',
  styleUrl: './find-challenge.component.css'
})
export class FindChallengeComponent implements OnInit {
  challenges!: Challenge[];

  constructor(private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.challengeService.getAll().then((challenges: Challenge[]) => this.challenges = challenges);
  }


}
