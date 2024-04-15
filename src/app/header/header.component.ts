import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ScreenSizeService} from "../../services/screen-size/screen-size.service";

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
  constructor(private screenSizeService: ScreenSizeService) {
  }

  isSmallDevice() {
    return this.screenSizeService.isSmallDevice()
  }
}
