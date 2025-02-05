import { Component, OnInit } from '@angular/core';
import { GameService } from './core/services/game-service';
import { Game } from './core/services/game.model';
import {NgClass, NgForOf} from '@angular/common';
import {IntroComponent} from './view/intro/intro.component';
import {GameListComponent} from './view/game-list/game-list.component';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import path from 'node:path';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NgForOf,
    IntroComponent,
    GameListComponent,
    RouterLink,
    RouterOutlet,
    NgClass
  ],
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  games: Game[] = [];
  mainPaddingClass  = '';
  url = '';

  constructor(private gameService: GameService, private router: Router) {
    this.router.events.subscribe(event  => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        if (url.startsWith('/quiz/')) {
          this.mainPaddingClass = 'px-10';
        } else {
          this.mainPaddingClass = '';
        }
      }
    });
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }
}
