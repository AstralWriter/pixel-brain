import {Component, OnInit} from '@angular/core';
import { Game } from '../services/game.model';
import { GameService } from '../services/game-service';

@Component({
  selector: 'game-list-component',
  templateUrl: 'game-list.component.html',
  standalone: true,
  styleUrl: './game-list.component.less',
})

export class GameListComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }
}
