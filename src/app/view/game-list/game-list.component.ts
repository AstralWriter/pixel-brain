import {Component, inject, OnInit} from '@angular/core';
import { Game } from '../../core/services/game.model';
import { GameService } from '../../core/services/game-service';
import {RouterLink} from '@angular/router';
import {GameComponent} from '../../core/components/game/game.component';

@Component({
  selector: 'game-list-component',
  templateUrl: 'game-list.component.html',
  standalone: true,
  styleUrl: './game-list.component.less',
  imports: [
    RouterLink,
    GameComponent
  ]
})

export class GameListComponent implements OnInit {
  games: Game[] = [];
  private gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }
}
