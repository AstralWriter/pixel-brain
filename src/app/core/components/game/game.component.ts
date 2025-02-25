import { Component, input, signal } from '@angular/core';
import { Game } from '../../services/game.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'game-component',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './game.component.html',
})
export class GameComponent {
  game = input<Game | undefined>();
  questionCounter = signal(10);
}
