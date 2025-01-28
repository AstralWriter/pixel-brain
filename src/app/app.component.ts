import { Component, OnInit } from '@angular/core';
import { GameService } from './core/services/game-service';
import { Game } from './core/services/game.model';
import { NgForOf } from '@angular/common';
import {IntroComponent} from './view/intro/intro.component';
import {GameListComponent} from './view/game-list/game-list.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NgForOf,
    IntroComponent,
    GameListComponent,
    RouterLink,
    RouterOutlet
  ],
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }
}
