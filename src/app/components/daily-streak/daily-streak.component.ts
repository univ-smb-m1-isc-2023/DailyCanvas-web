import {Component, OnInit} from '@angular/core';
import ApexCharts from 'apexcharts'
@Component({
  selector: 'app-daily-streak',
  standalone: true,
  imports: [],
  templateUrl: './daily-streak.component.html',
  styleUrl: './daily-streak.component.css'
})
export class DailyStreakComponent implements OnInit{


  ngOnInit(){
    var options = {
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

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  }
}
