import {Component, OnInit} from '@angular/core';
import {EntryService} from "../../../services/entry/entry.service";
import {UserService} from "../../../services/user/user.service";
import {Entry} from "../../../model/entry";
import {NgClass, NgIf} from "@angular/common";
import {GraphComponent} from "../../elements/graph/graph.component";
@Component({
  selector: 'app-daily-streak',
  standalone: true,
  imports: [NgIf, NgClass, GraphComponent],
  templateUrl: './daily-streak.component.html',
  styleUrl: './daily-streak.component.css'
})
export class DailyStreakComponent implements OnInit{
  entries!: Entry[];
  entriesStartChallenge!: number[][];

  constructor(private entryService: EntryService, private userService: UserService) {
  }

  async ngOnInit(){
    this.entries = await this.entryService.getAllEntriesOfUser(this.userService.getLocalUser()!.id);
    this.entriesStartChallenge = this.convertEntriesToApexChartData(await this.entryService.getAllEntriesOfStartChallengeOfUser(this.userService.getLocalUser()!.id));
  }

  convertEntriesToApexChartData(entries: Entry[]): number[][]{
    const data: number[][] = [];
    entries.forEach((entry: Entry) => {
      data.push([(new  Date(entry.date)).getTime(), this.convertEntryTypeBasicToString(entry.idEntryType)])
    });
    return data;
  }

  convertEntryTypeBasicToString(id: number): number{
    switch (id){
      case 1:
        return 50;
      case 24:
        return 40;
      case 9:
        return 30;
      case 5:
        return 20;
      case 4:
        return 10;
      default:
        return 0;
    }
  }
}
