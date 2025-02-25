import { Component, inject, OnInit, signal } from '@angular/core';
import { Game } from '../../core/services/game.model';
import { GameService } from '../../core/services/game-service';
import { GameComponent } from '../../core/components/game/game.component';

@Component({
  selector: 'game-list-component',
  templateUrl: 'game-list.component.html',
  standalone: true,
  imports: [
    GameComponent
  ]
})
export class GameListComponent implements OnInit {
  games = signal<Game[]>([]);
  // codestyle: injects oben in die klasse und alles andere darunter
  private gameService = inject(GameService);

  ngOnInit(): void {
    // parameter typisierung e.g. data: Game[]
    this.gameService.getGames().subscribe((data) => {
      this.games.set(data);
    });
  }
}
