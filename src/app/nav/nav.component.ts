import { Component } from '@angular/core';
import {NgFor} from "@angular/common";
import {RouterLink} from "@angular/router";
import {IconComponent} from "../elements/icon/icon.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgFor, RouterLink, IconComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  elements: {
    name: string,
    icon: string,
    link?: string,
    children: {
      name: string,
      link: string
    }[]
  }[] = [
    {
      name: "Objectifs",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M439 32v165h18V32zm-18 12.99L327.6 80l93.4 35zM165.9 103c-5 0-10.2 2.3-15.3 7c-6.2 5.8-11.5 15.1-13.8 26.3c-2.3 11.3-1 22 2.5 29.7c3.5 7.8 8.6 12.3 14.6 13.5c6 1.3 12.4-.9 18.7-6.6c6.1-5.8 11.5-15.1 13.8-26.4c2.2-11.3.9-22-2.5-29.7c-3.5-7.8-8.6-12.2-14.6-13.5c-1.1-.2-2.3-.3-3.4-.3m-38.4 78.5c-3.4 1.2-6.9 2.5-10.7 4.1c-24.85 15.7-42.2 31.2-59.84 55.7c-11.19 15.5-11.74 42-12.58 61.5l20.8 9.2c.87-27.8.36-39.3 13.27-55.3c9.83-12.2 19.33-25 37.55-28.9c1.6 28.9-2.6 73.7-14 119.6c20.5 2.8 37.6-.7 57-6.3c50.7-25.3 74.1-3.8 109.3 45.7l20.5-32.1c-24.6-28.9-48.5-75.1-117.2-57.3c5-27.3 5.6-45.4 8.6-72.6c.6-12 .8-23.9 1.1-35.7c-8.9 6.8-19.9 10.4-31 8.1c-9.5-2-17.3-7.9-22.8-15.7m144.2 7.3c-18.2 17.8-22.2 31-50.2 38.4l-22.5-24c-.4 12.8-.8 25.9-1.9 39.2c9.5 8.7 19.2 15.7 22.7 14.6c31.3-9.4 40.3-20.3 61.4-41.9zM409 215v96h-96v96h-96v78.1c102.3.2 167.8 1.1 270 1.8V215zM140.7 363.9c-13.6 2.5-27.8 3.3-43.44.9c-10.89 37.5-26.76 74.3-48.51 102.5l38.63 15.3c27.02-37.9 36.82-70.6 53.32-118.7"/></svg>`,
      children: [
        {
          name: "Mes objectifs",
          link: "/account"
        }
      ]
    },
    {
      name: "Ma toile",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 7A6.5 6.5 0 1 1 7 .5"/><path d="m10.5.5l-5 5l-1 4l4-1l5-5"/></g></svg>`,
      children: [
        {
          name: "Ajouter une entrée",
          link: "/home"
        }
      ]
    }
  ];


}
