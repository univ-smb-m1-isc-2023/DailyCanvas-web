import {Component, OnInit} from '@angular/core';
import ApexCharts from 'apexcharts'
import {EntryService} from "../../../services/entry/entry.service";
import {UserService} from "../../../services/user/user.service";
import {Entry} from "../../../model/entry";
import {NgClass, NgIf} from "@angular/common";
@Component({
  selector: 'app-daily-streak',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './daily-streak.component.html',
  styleUrl: './daily-streak.component.css'
})
export class DailyStreakComponent implements OnInit{
  entries!: Entry[];

  constructor(private entryService: EntryService, private userService: UserService) {
  }

  async ngOnInit(){
    this.entries = await this.entryService.getAllEntriesOfUser(this.userService.getLocalUser()!.id)
    let options = {
      chart: {
        width: "100%",
        height: "100%",
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [30,40,35,50,49,60,70,91,125]
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
      },
    }

    let chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  }
}
