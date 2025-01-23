import {Component, inject, OnInit} from '@angular/core';
import { GameService } from './services/game-service';
import { Game } from './services/game.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  gameService = inject(GameService);
  games: Game[] = [];

  ngOnInit(): void {
    this.gameService.getGames().then((data) => {
      this.games = data;
    });
  }
}
