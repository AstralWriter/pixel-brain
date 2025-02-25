import { Component, inject, OnInit} from '@angular/core';
import { GameService } from './core/services/game-service';
import { Game } from './core/services/game.model';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  games: Game[] = [];
  private gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data: Game[]) => {
      this.games = data;
    });
  }
}
