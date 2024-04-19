import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-floating-nav',
  standalone: true,
  imports: [],
  templateUrl: './floating-nav.component.html',
  styleUrl: './floating-nav.component.css'
})
export class FloatingNavComponent {
  @Input() navElements!: navElement[];
}

interface navElement {
  name: string;
  link: string;
}
