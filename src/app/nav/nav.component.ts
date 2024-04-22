import { Component } from '@angular/core';
import {NgClass, NgFor} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {IconComponent} from "../elements/icon/icon.component";
import {DividerComponent} from "../elements/divider/divider.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgFor, RouterLink, IconComponent, DividerComponent, NgClass],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  elements: navElement[] = [
    {
      name: "Objectifs",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M17 2.456c.741.141 1.181.297 1.56.765c.477.586.452 1.219.401 2.485c-.18 4.553-1.2 10.294-6.96 10.294S5.22 10.26 5.038 5.706c-.05-1.266-.075-1.9.4-2.485c.476-.586 1.045-.682 2.184-.874A26.374 26.374 0 0 1 12 2c.718 0 1.386.025 2 .068"/><path d="m19 5l.949.316c.99.33 1.485.495 1.768.888c.283.393.283.915.283 1.958v.073c0 .86 0 1.291-.207 1.643c-.207.352-.584.561-1.336.98L17.5 12.5M5 5l-.949.316c-.99.33-1.485.495-1.768.888C2 6.597 2 7.12 2 8.162v.073c0 .86 0 1.291.207 1.643c.207.352.584.561 1.336.98L6.5 12.5"/><path stroke-linecap="round" d="M12 17v2"/><path stroke-linecap="round" stroke-linejoin="round" d="M15.5 22h-7l.34-1.696a1 1 0 0 1 .98-.804h4.36a1 1 0 0 1 .98.804z"/><path stroke-linecap="round" d="M18 22H6"/></g></svg>`,
      children: [
        {
          name: "Mes objectifs",
          link: "/challenge/my"
        },
        {
          name: "Trouver un défi",
          link: "/challenges"
        },
        {
          name: "Créer un défi",
          link: "/challenge/create"
        }
      ]
    },
    {
      name: "Ma toile",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m16.652 3.455l.649-.649A2.753 2.753 0 0 1 21.194 6.7l-.65.649m-3.892-3.893s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298m-3.893-3.893L10.687 9.42c-.404.404-.606.606-.78.829c-.205.262-.38.547-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9m12.133-6.552l-2.983 2.982m-2.982 2.983c-.404.404-.606.606-.829.78a4.59 4.59 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-1.735.579m0 0l-1.123.374a.742.742 0 0 1-.939-.94l.374-1.122m1.688 1.688L8.412 13.9"/><path fill="currentColor" d="M22.75 12a.75.75 0 0 0-1.5 0zM12 2.75a.75.75 0 0 0 0-1.5zM7.376 20.013a.75.75 0 1 0-.752 1.298zm-4.687-2.638a.75.75 0 1 0 1.298-.75zM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75zM12 1.25C6.063 1.25 1.25 6.063 1.25 12h1.5A9.25 9.25 0 0 1 12 2.75zM6.624 21.311A10.704 10.704 0 0 0 12 22.75v-1.5a9.204 9.204 0 0 1-4.624-1.237zM1.25 12a10.7 10.7 0 0 0 1.439 5.375l1.298-.75A9.204 9.204 0 0 1 2.75 12z"/></g></svg>`,
      children: [
        {
          name: "Ajouter une entrée",
          link: "/canvas/add",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m14.36 4.079l.927-.927a3.932 3.932 0 0 1 5.561 5.561l-.927.927m-5.56-5.561s.115 1.97 1.853 3.707C17.952 9.524 19.92 9.64 19.92 9.64m-5.56-5.561L12 6.439m7.921 3.2l-5.26 5.262L11.56 18l-.16.161c-.578.577-.867.866-1.185 1.114a6.554 6.554 0 0 1-1.211.749c-.364.173-.751.302-1.526.56l-3.281 1.094m0 0l-.802.268a1.06 1.06 0 0 1-1.342-1.342l.268-.802m1.876 1.876l-1.876-1.876m0 0l1.094-3.281c.258-.775.387-1.162.56-1.526c.205-.43.456-.836.749-1.211c.248-.318.537-.607 1.114-1.184L8.5 9.939"/></svg>`
        }
      ]
    },
    {
      name: "Calendrier",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14v-2c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828c-.653.654-1.528.943-2.828 1.07M7 4V2.5M17 4V2.5M21.5 9H10.75M2 9h3.875"/><path fill="currentColor" d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/></g></svg>`,
      children: [
        {
          name: "Mes événements",
          link: "/events"
        },
        {
          name: "Ajouter un événement",
          link: "/event/create"
        }
      ]
    }
  ];

  CHALLENGES: navElement = this.elements[0];
  ENTRY: navElement = this.elements[1];
  CALENDAR: navElement = this.elements[2];
  PROGRESS: navElement ={
    name: "Progression",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"/><path stroke-linejoin="round" d="m7 14l2.293-2.293a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 0 1.414 0L17 10m0 0v2.5m0-2.5h-2.5"/></g></svg>`,
    children: [
      {
        name: "...",
        link: "/?"
      }
    ]
  };
  ACCOUNT: navElement = {
  name: "Mon compte",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="6" r="4"/><path stroke-linecap="round" d="M15 20.615c-.91.247-1.926.385-3 .385c-3.866 0-7-1.79-7-4s3.134-4 7-4s7 1.79 7 4c0 .345-.077.68-.22 1"/></g></svg>`,
    children: [
      {
        name: "Mon profil",
        link: "/account"
      }
    ]
  }

  constructor(private router: Router) {
  }
  isCurrentURL(URL: string){
    return  this.router.url === URL;
  }

  isCurrentGroupURL(group: navElement): boolean {
    for (const child of group.children) {
      if(child.link === this.router.url){
        return true;
      }
    }
    return false;
  }
}
interface navElement {
  name: string;
  icon: string;
  link?: string;
  children: {
    name: string;
    link: string;
    icon?: string;
  }[];
}
