import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent implements AfterViewInit{
  @Input() pathData!: string;
  @ViewChild('element') element!: ElementRef;

  ngAfterViewInit(): void {
    this.element.nativeElement.innerHTML = this.pathData;
  }
}
