import { Component } from '@angular/core';
import {NgFor} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgFor, RouterLink],
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
      icon: `<span>icon</span>`, //TODO Trouver comment faire marcher les balises svg
      children: [
        {
          name: "Mes objectifs",
          link: "/account"
        }
      ]
    },
    {
      name: "Ma toile",
      icon: "",
      children: [
        {
          name: "Ajouter une entrée",
          link: "/home"
        }
      ]
    }
  ];


}
