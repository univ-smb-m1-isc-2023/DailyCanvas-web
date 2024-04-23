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

  constructor(private entryService: EntryService, private userService: UserService) {
  }

  async ngOnInit(){
    this.entries = await this.entryService.getAllEntriesOfUser(this.userService.getLocalUser()!.id)
  }
}
