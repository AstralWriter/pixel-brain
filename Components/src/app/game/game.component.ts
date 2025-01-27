import {Component, OnInit} from '@angular/core';
import { Game } from '../services/game.model';
import { GameService } from '../services/game-service';

@Component({
  selector: 'game-component',
  templateUrl: 'game.component.html',
  standalone: true,
})

export class GameComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }
}
