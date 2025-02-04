import {Component, input } from '@angular/core';
import {Game} from '../../services/game.model';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'game-component',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.less'
})
export class GameComponent {
  game = input<Game | undefined>();
}
