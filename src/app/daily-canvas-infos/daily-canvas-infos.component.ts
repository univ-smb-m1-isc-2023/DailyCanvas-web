import {Component, EventEmitter, Output} from '@angular/core';
import {ScreenSizeService} from "../../services/screen-size/screen-size.service";

@Component({
  selector: 'app-daily-canvas-infos',
  standalone: true,
  imports: [],
  templateUrl: './daily-canvas-infos.component.html',
  styleUrl: './daily-canvas-infos.component.css'
})
export class DailyCanvasInfosComponent {
  @Output() pageChange = new EventEmitter<number>();

  constructor(private screenSizeService: ScreenSizeService) {
  }

  changePage() {
    this.pageChange.emit(2);
  }

  isMobileDevice(){
    return this.screenSizeService.isMobileDevice();
  }

}
