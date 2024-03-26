import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-challenge',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-challenge.component.html',
  styleUrl: './create-challenge.component.css'
})
export class CreateChallengeComponent implements AfterViewInit{
  challengeForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl(''),
    interval: new FormControl(''),
  });
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    const hostElement = this.elRef.nativeElement;
    this.renderer.setStyle(hostElement, 'flex-grow', '1');
  }

  test(){
    console.log(this.challengeForm)
  }
}
