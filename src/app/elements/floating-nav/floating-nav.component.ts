import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-floating-nav',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './floating-nav.component.html',
  styleUrl: './floating-nav.component.css'
})
export class FloatingNavComponent {
  @Input() navElements!: NavElement[];
  isOpen: boolean = false;
  changeStatus(){
    this.isOpen = !this.isOpen;
  }
}

export interface NavElement {
  name: string;
  link: string;
}
