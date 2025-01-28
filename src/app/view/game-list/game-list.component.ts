import {Component, OnInit} from '@angular/core';
import { Game } from '../../core/services/game.model';
import { GameService } from '../../core/services/game-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'game-list-component',
  templateUrl: 'game-list.component.html',
  standalone: true,
  styleUrl: './game-list.component.less',
  imports: [
    RouterLink
  ]
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