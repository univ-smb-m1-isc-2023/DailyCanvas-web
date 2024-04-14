import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import type {Challenge} from "../../../model/challenge";
import {UserService} from "../../../services/user/user.service";
import {Event} from "../../../model/event";
import {EventService} from "../../../services/event/event.service";

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  eventForm = new FormGroup({
    title: new FormControl<string>('',{
      validators: [Validators.required],
      nonNullable: true
      }),
    description: new FormControl<string>('',{
      validators: [Validators.required],
      nonNullable: false
    }),
    date: new FormControl<Date>(new Date(),{
      validators: [Validators.required],
      nonNullable: false
    }),
    })

  constructor(private userService: UserService, private eventService: EventService) {
  }

  createEvent(){
    console.log(this.eventForm)
    if(this.eventForm.status === "VALID"){
      let id: number | undefined = this.userService.getLocalUser()?.id
      if (id == undefined){
        console.log("user error")
        return
      }
      const event: Omit<Event, "id"> = {
        idUser:id,
        title: <string>this.eventForm.value.title,
        description: <string>this.eventForm.value.description,
        date: <Date>this.eventForm.value.date,
        birthday: false
      };
      this.eventService.create(event).then(() => this.eventForm.reset())
    } else {
      console.log("error in form")
      return;
    }
  }
}
