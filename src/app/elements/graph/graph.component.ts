import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexXAxis,
  ApexStroke, NgApexchartsModule, ApexTooltip, ApexYAxis
} from "ng-apexcharts";
import {EntryType} from "../../../model/entry-type";
import {EntryTypeService} from "../../../services/entry-type/entry-type.service";
import {IconComponent} from "../icon/icon.component";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    NgApexchartsModule,
    IconComponent,
    NgFor,
    NgIf
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit{
  @Input() data: number[][] = [];
  @ViewChild("chart") chart!: ChartComponent;
  emojis_basic!: EntryType[];
  public chartOptions!: ChartOptions;

  constructor(private entryTypesService: EntryTypeService) {
  }

  async ngOnInit(): Promise<void> {
    const emojis = await this.entryTypesService.getEmojis();
    this.emojis_basic = [
      emojis[0],
      emojis[20],
      emojis[6],
      emojis[2],
      emojis[1]
    ];
    this.chartOptions = {
      series: [
        {
          name: "Trouver un petit moment de bonheur",
          data: this.data,
        }
      ],
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Trouver un petit moment de bonheur",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#e3dae733", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        min: 10,
        max: 50,
        showAlways: false,
        showForNullSeries: false,
        show: false,
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
    };
  }
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
