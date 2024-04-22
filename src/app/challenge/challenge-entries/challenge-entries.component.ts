import {Component, OnInit} from '@angular/core';
import {Challenge} from "../../../model/challenge";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "../../../model/entry";
import {EntryService} from "../../../services/entry/entry.service";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {FloatingNavComponent, NavElement} from "../../elements/floating-nav/floating-nav.component";
import {EntryTypeService} from "../../../services/entry-type/entry-type.service";
import {IconComponent} from "../../elements/icon/icon.component";

@Component({
  selector: 'app-challenge-entries',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FloatingNavComponent, IconComponent],
  templateUrl: './challenge-entries.component.html',
  styleUrl: './challenge-entries.component.css'
})
export class ChallengeEntriesComponent implements OnInit {
  redirectLinks: NavElement[] = [
    {
      name: "Mes défis",
      link: "/challenge/my"
    },
    {
      name: "Créer un défi",
      link: "/challenge/create"
    },
    {
      name: "Trouver un défi",
      link: "/challenges"
    }
  ];
  challenge!: Challenge;
  entries!: Entry[];
  constructor(private route: ActivatedRoute, private router: Router, private entryService: EntryService, private entryTypeService: EntryTypeService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.challenge = JSON.parse(decodeURIComponent(this.route.snapshot.params['challenge']));
      if (this.challenge.subscribeId) {
        this.entries = await this.entryService.getAllChallengeEntriesOfUser(this.challenge.subscribeId);
      }
      console.log(this.entries)
    } catch {
      await this.router.navigateByUrl("/home");
    }
  }

  getStringDate(date: Date){
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: 'numeric'
    };
    const dateStringify = new Date(date).toLocaleDateString('fr-FR', options);
    return dateStringify.charAt(0).toUpperCase() + dateStringify.substring(1);
  }
}
