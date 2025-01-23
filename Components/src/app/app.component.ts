import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game-service';
import { Game } from './services/game.model';
import { NgForOf } from '@angular/common';

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
  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }
}
