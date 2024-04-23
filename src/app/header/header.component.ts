import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ScreenSizeService} from "../../services/screen-size/screen-size.service";
import {ConnectionPageService} from "../../services/connectionPage/connection-page.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private screenSizeService: ScreenSizeService, private connectionPageService: ConnectionPageService) {
  }

  isSmallDevice() {
    return this.screenSizeService.isSmallDevice()
  }
  
  changePage(num: number) {
    this.connectionPageService.changePage(num);
  }

}
